import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotController } from "./bot.controller";
import { BotUpdate } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./ models/bot.model";
import { Address } from "./ models/address.model";

@Module({
  imports: [SequelizeModule.forFeature([Bot, Address])],
  controllers: [BotController],
  providers: [BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
