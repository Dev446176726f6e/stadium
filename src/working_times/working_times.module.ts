import { Module } from "@nestjs/common";
import { WorkingTimesService } from "./working_times.service";
import { WorkingTimesController } from "./working_times.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { WorkingTime } from "./model/working_time.model";

@Module({
  imports: [SequelizeModule.forFeature([WorkingTime])],
  controllers: [WorkingTimesController],
  providers: [WorkingTimesService],
})
export class WorkingTimesModule {}
