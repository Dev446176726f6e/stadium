import { Injectable } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Media } from "./model/media.model";

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private mediaModel: typeof Media) {}

  async create(createMediaDto: CreateMediaDto) {
    const new_media = await this.mediaModel.create(createMediaDto);
    return new_media;
  }

  findAll() {
    return this.mediaModel.findAll();
  }

  findOne(id: number) {
    return this.mediaModel.findByPk(id);
  }

  async update(id: number, updatemediaDto: UpdateMediaDto) {
    const updated_media = await this.mediaModel.update(updatemediaDto, {
      where: { id },
      returning: true,
    });
    return updated_media[1][0];
  }

  remove(id: number) {
    return this.mediaModel.destroy({ where: { id } });
  }
}
