import { PartialType } from '@nestjs/swagger';
import { CreateWorkingTimeDto } from './create-working_time.dto';

export class UpdateWorkingTimeDto extends PartialType(CreateWorkingTimeDto) {}
