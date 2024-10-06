import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StadiumStatusService } from './stadium_status.service';
import { CreateStadiumStatusDto } from './dto/create-stadium_status.dto';
import { UpdateStadiumStatusDto } from './dto/update-stadium_status.dto';

@Controller('stadium-status')
export class StadiumStatusController {
  constructor(private readonly stadiumStatusService: StadiumStatusService) {}

  @Post()
  create(@Body() createStadiumStatusDto: CreateStadiumStatusDto) {
    return this.stadiumStatusService.create(createStadiumStatusDto);
  }

  @Get()
  findAll() {
    return this.stadiumStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadiumStatusDto: UpdateStadiumStatusDto) {
    return this.stadiumStatusService.update(+id, updateStadiumStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumStatusService.remove(+id);
  }
}
