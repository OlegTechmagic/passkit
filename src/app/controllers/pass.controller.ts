import { CreatePassDto, PersonDto } from '@dto';
import { deleteMember, enrollMember, getList, updateMember } from '@services';
import { BaseController, Controller, Delete, Get, Patch, Post, ValidateBody } from '@utils';
import { type Request } from 'express';

@Controller('/pass')
export class PassController extends BaseController {
  @Post('/')
  @ValidateBody(CreatePassDto)
  async getPass(req: Request<unknown, unknown, CreatePassDto>) {
    return enrollMember(req.body);
  }

  @Get('/')
  async list(req: Request<unknown, unknown, unknown, { programId: string }>) {
    return getList(req.query.programId);
  }

  @Patch('/:id')
  @ValidateBody(PersonDto)
  async update(req: Request<{ id: string }, unknown, PersonDto, unknown>) {
    return updateMember(req.params.id, req.body);
  }

  @Delete('/:id')
  async delete(req: Request<{ id: string }, unknown, unknown, unknown>) {
    return deleteMember(req.params.id);
  }
}
