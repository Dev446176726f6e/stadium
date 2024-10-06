import { PartialType } from '@nestjs/swagger';
import { CreateStadiumStatusDto } from './create-stadium_status.dto';

export class UpdateStadiumStatusDto extends PartialType(CreateStadiumStatusDto) {}
