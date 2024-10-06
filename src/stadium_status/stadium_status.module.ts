import { Module } from "@nestjs/common";
import { StadiumStatusService } from "./stadium_status.service";
import { StadiumStatusController } from "./stadium_status.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { StadiumStatus } from "./model/stadium_status.model";

@Module({
  imports: [SequelizeModule.forFeature([StadiumStatus])],
  controllers: [StadiumStatusController],
  providers: [StadiumStatusService],
})
export class StadiumStatusModule {}
