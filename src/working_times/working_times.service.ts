import { Injectable } from "@nestjs/common";
import { CreateWorkingTimeDto } from "./dto/create-working_time.dto";
import { UpdateWorkingTimeDto } from "./dto/update-working_time.dto";
import { InjectModel } from "@nestjs/sequelize";
import { WorkingTime } from "./model/working_time.model";

@Injectable()
export class WorkingTimesService {
  constructor(
    @InjectModel(WorkingTime) private workingTimeModel: typeof WorkingTime,
  ) {}

  async create(createWorkingTimeDto: CreateWorkingTimeDto) {
    const new_working_time =
      await this.workingTimeModel.create(createWorkingTimeDto);
    return new_working_time;
  }

  findAll() {
    // add other connected tables.
    return this.workingTimeModel.findAll();
  }

  findOne(id: number) {
    // add other connected tables.
    return this.workingTimeModel.findByPk(id);
  }

  async update(id: number, updateWorkingTimeDto: UpdateWorkingTimeDto) {
    // need to check before updating.
    const updated_working_time = await this.workingTimeModel.update(
      updateWorkingTimeDto,
      { where: { id }, returning: true },
    );
    return updated_working_time[1][0];
  }

  remove(id: number) {
    return this.workingTimeModel.destroy({ where: { id } });
  }
}
