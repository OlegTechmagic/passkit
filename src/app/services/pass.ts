import { passkit } from '../passkit';

export const createPass = () => {
  return passkit.createMember();
};
