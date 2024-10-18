import { CreatePassDto, PersonDto, UpdatePersonDto } from '@dto';
import { deleteMember, enrollMember, getList, updateMember } from '@services';
import { BaseController, Controller, Delete, Get, Patch, Post, ValidateBody } from '@utils';
import { type Request } from 'express';

@Controller('/member')
export class MemberController extends BaseController {
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
  @ValidateBody(UpdatePersonDto)
  async update(
    req: Request<{ id: string }, unknown, PersonDto, { programId: string; tierId: string }>,
  ) {
    return updateMember(req.query.programId, req.query.tierId, req.params.id, req.body);
  }

  @Delete('/:id')
  async delete(req: Request<{ id: string }, unknown, unknown, unknown>) {
    return deleteMember(req.params.id);
  }
}
