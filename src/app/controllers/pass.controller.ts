import { CreatePassDto } from '@dto';
import { enrollMember } from '@services';
import { BaseController, Controller, Post, ValidateBody } from '@utils';
import { type Request } from 'express';

@Controller('/pass')
export class PassController extends BaseController {
  @Post('/')
  @ValidateBody(CreatePassDto)
  async getPass(req: Request<unknown, unknown, CreatePassDto>) {
    return enrollMember(req.body);
  }
}
