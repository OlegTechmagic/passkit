import { CreatePassDto, PersonDto } from '@dto';
import { deleteMember, enrollMember, getOneById, updateMember } from '@services';
import { BaseController, Controller, Delete, Get, Patch, Post, ValidateBody } from '@utils';
import { type Request } from 'express';

@Controller('/member')
export class MemberController extends BaseController {
  @Post('/')
  @ValidateBody(CreatePassDto)
  async getPass(req: Request<unknown, unknown, CreatePassDto>) {
    return enrollMember(req.body);
  }

  @Get('/:memberId')
  async list(req: Request<{ memberId: string }>) {
    return getOneById(req.params.memberId);
  }

  @Patch('/:id')
  @ValidateBody(PersonDto)
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
