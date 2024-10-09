import { config } from '@config';
import { Person } from 'passkit-node-sdk/io/common/personal_pb';
import { Member } from 'passkit-node-sdk/io/member/member_pb';

import PassKitGRPC from './client';

export class PasskitProvider {
  private pkClient;

  constructor() {
    this.pkClient = new PassKitGRPC().getInstance();
  }

  createMember() {
    console.log('Creating silver member');

    const member = new Member();
    const person = new Person()
      // .setFirstname('Steve')
      .setDisplayname('Silver Steve')
      .setEmailaddress('keeperoleg26@gmail.com');

    member
      .setTierid(config.PASSKIT_TIER_ID)
      .setProgramid(config.PASSKIT_PROGRAM_ID)
      .setPerson(person);

    return new Promise((resolve, reject) => {
      this.pkClient.getMembershipClient().enrolMember(member, (err: any, response: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }
}
