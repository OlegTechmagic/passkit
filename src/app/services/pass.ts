import { CreatePassDto } from '@dto';

import { passkit } from '../passkit';

export const enrollMember = (enrollMemberData: CreatePassDto) => {
  return passkit.enrollMember(
    enrollMemberData.tierId,
    enrollMemberData.programId,
    enrollMemberData.person,
  );
};
