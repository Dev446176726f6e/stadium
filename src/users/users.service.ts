import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model/user.model";

import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { SignInDto } from "./dto/sign-in.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_TIME,
        expiresIn: process.env.REFRESH_TOKEN_KEY,
      }),
    ]);

    return { access_token, refresh_token };
  }

  async signUp(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException("User already exists");
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 10);
    const new_user = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });
    const tokens = await this.generateTokens(new_user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);
    const activation_link = uuid.v4();

    const updated_user = await this.userModel.update(
      {
        hashed_refresh_token,
        activation_link,
      },
      { where: { id: new_user.id }, returning: true },
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    const response = {
      message: "User registered",
      user: updated_user[1][0],
      access_token: tokens.access_token,
    };

    return response;
  }

  async signIn(signinDto: SignInDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { email: signinDto.email },
    });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const valid_password = bcrypt.compareSync(
      signinDto.password,
      user.hashed_password,
    );

    if (!valid_password) {
      // this message is just for me.
      throw new UnauthorizedException("Wrong password");
    }
    const tokens = await this.generateTokens(user);
    user.hashed_refresh_token = bcrypt.hashSync(tokens.refresh_token, 10);
    await user.save();

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    const response = {
      message: "User signed in",
      user: user[1][0],
      access_token: tokens.access_token,
    };

    return response;
  }

  // async signOut(req: Request, ) {
  //   const { refresh_token } = req.cookies;
  //   if (!refresh_token) {
  //     throw new UnauthorizedException("")
  //   }

  //   const user = await this.userModel.update
  // }

  // async refreshToken(req: Request) {
  //   try {
  //     // const {refresh_token} = req
  //   } catch (error) {}
  // }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const is_avaliable = await this.userModel.findByPk(id);
    if (!is_avaliable) {
      return { message: "Update object not found" };
    }
    const updated_user = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return updated_user[1][0];
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
