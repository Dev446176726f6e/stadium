import { Injectable } from "@nestjs/common";
import { CreateStadiumStatusDto } from "./dto/create-stadium_status.dto";
import { UpdateStadiumStatusDto } from "./dto/update-stadium_status.dto";
import { InjectModel } from "@nestjs/sequelize";
import { StadiumStatus } from "./model/stadium_status.model";

@Injectable()
export class StadiumStatusService {
  constructor(
    @InjectModel(StadiumStatus)
    private stadiumStatusModel: typeof StadiumStatus,
  ) {}

  async create(createStadiumStatusDto: CreateStadiumStatusDto) {
    const new_status = await this.stadiumStatusModel.create(
      createStadiumStatusDto,
    );
    return new_status;
  }

  findAll() {
    // add connection and guard.
    return this.stadiumStatusModel.findAll();
  }

  findOne(id: number) {
    return this.stadiumStatusModel.findByPk(id);
  }

  async update(id: number, updateStadiumStatusDto: UpdateStadiumStatusDto) {
    // i can add check.
    const updated_status = await this.stadiumStatusModel.update(
      updateStadiumStatusDto,
      { where: { id }, returning: true },
    );
    return updated_status[1][0];
  }

  remove(id: number) {
    return this.stadiumStatusModel.destroy({ where: { id } });
  }
}
