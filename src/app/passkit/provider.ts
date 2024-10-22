/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EnrollPerson, Person as PersonDto } from '@types';
import { createPersonInstance } from '@utils';
import { Id } from 'passkit-node-sdk/io/common/common_objects_pb';
import { Member } from 'passkit-node-sdk/io/member/member_pb';

import PassKitGRPC from './client';

export class PasskitProvider {
  private pkClient;

  constructor() {
    this.pkClient = new PassKitGRPC().getInstance();
  }

  deleteMember(memberId: string) {
    const member = new Member().setId(memberId);
    return new Promise((resolve, reject) => {
      this.pkClient.getMembershipClient().deleteMember(member, (err: any) => {
        return err ? reject(err) : resolve(memberId);
      });
    });
  }

  updateMember(programId: string, tierId: string, memberId: string, personData: PersonDto) {
    const member = new Member().setId(memberId);
    const person = createPersonInstance(personData);
    member.setTierid(tierId).setProgramid(programId).setPerson(person);

    return new Promise((resolve, reject) => {
      this.pkClient
        .getMembershipClient()
        .updateMember(member, person, (err: any, response: any) => {
          return err ? reject(err) : resolve(response.toObject());
        });
    });
  }

  enrollMember(tierId: string, programId: string, personData: EnrollPerson) {
    const member = new Member().setId(personData.externalId);
    const person = createPersonInstance(personData);

    member.setTierid(tierId).setProgramid(programId).setPerson(person);

    return new Promise((resolve, reject) => {
      this.pkClient.getMembershipClient().enrolMember(member, (err: any, response: any) => {
        return err
          ? reject(err)
          : resolve({
              response: response.toObject(),
              member: member.toObject(),
              person: person.toObject(),
            });
      });
    });
  }

  async listMembers(memberId: string) {
    const id = new Id();
    id.setId(memberId);

    try {
      const resp = await new Promise((resolve, reject) => {
        return this.pkClient
          .getMembershipClient()
          .getMemberRecordById(id, (err: any, response: any) => {
            if (err) {
              return reject(err);
            }
            return resolve(response.toObject());
          });
      });

      return resp;
    } catch (err: any) {
      return Promise.resolve(err);
    }
  }
}
