import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaMaterialDto } from './create.dto';

export class UpdateReservaMaterialDto extends PartialType(CreateReservaMaterialDto) {}
