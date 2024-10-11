import type { EnrollPerson } from '@types';
import { Person } from 'passkit-node-sdk/io/common/personal_pb';
import { Member } from 'passkit-node-sdk/io/member/member_pb';

import PassKitGRPC from './client';

export class PasskitProvider {
  private pkClient;

  constructor() {
    this.pkClient = new PassKitGRPC().getInstance();
  }

  enrollMember(tierId: string, programId: string, personData: EnrollPerson) {
    console.log(personData);
    const member = new Member();
    const person = new Person()
      .setForename(personData.name)
      .setGender(personData.gender)
      .setDateofbirth(personData.dob)
      .setMobilenumber(personData.phone)
      .setDisplayname(personData.name + ' ' + personData.surname)
      .setEmailaddress(personData.email)
      .setExternalid(personData.externalId);

    member.setTierid(tierId).setProgramid(programId).setPerson(person);

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.pkClient.getMembershipClient().enrolMember(member, (err: any, response: any) => {
        return err ? reject(err) : resolve(response);
      });
    });
  }
}
