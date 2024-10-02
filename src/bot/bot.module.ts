import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotController } from "./bot.controller";
import { BotUpdate } from "./bot.update";

@Module({
  controllers: [BotController],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
