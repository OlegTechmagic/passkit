import { CreatePassDto, PersonDto } from '@dto';

import { passkit } from '../passkit';

export const enrollMember = (enrollMemberData: CreatePassDto) => {
  return passkit.enrollMember(
    enrollMemberData.tierId,
    enrollMemberData.programId,
    enrollMemberData.person,
  );
};
export const updateMember = (
  programId: string,
  tierId: string,
  memberId: string,
  updateMemberData: PersonDto,
) => {
  return passkit.updateMember(programId, tierId, memberId, updateMemberData);
};

export const getList = (programId: string) => {
  return passkit.listMembers(programId);
};
export const deleteMember = (memberId: string) => {
  return passkit.deleteMember(memberId);
};