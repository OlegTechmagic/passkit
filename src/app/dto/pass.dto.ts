import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { EnrollPersonDto } from './person.dto';

export class CreatePassDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => EnrollPersonDto)
  person: EnrollPersonDto;
  @IsString()
  programId: string;
  @IsString()
  tierId: string;
}
