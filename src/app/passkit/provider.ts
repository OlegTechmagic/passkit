/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EnrollPerson, Person as PersonDto } from '@types';
import { createPersonInstance } from '@utils';
import { NotFound } from 'http-errors';
import imageToBase64 from 'image-to-base64';
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

  async enrollMember(tierId: string, programId: string, personData: EnrollPerson) {
    const member = new Member().setId(personData.externalId);
    const person = createPersonInstance(member, personData);
    const profileImage = await imageToBase64(personData.image);

    member
      .setTierid(tierId)
      .setProgramid(programId)
      .setPerson(person)
      .setProfileimage(profileImage);

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

  async getById(memberId: string) {
    const id = new Id();
    id.setId(memberId);

    return new Promise((resolve, reject) => {
      return this.pkClient
        .getMembershipClient()
        .getMemberRecordById(id, (err: any, response: any) => {
          if (response) {
            return resolve(response.toObject());
          }

          if (err.code === 5) {
            return reject(new NotFound('Member not found'));
          }
          return reject(err);
        });
    });
  }

  async updateMember(programId: string, tierId: string, memberId: string, personData: PersonDto) {
    const member = new Member().setId(memberId);
    const person = createPersonInstance(member, personData);

    const profileImage = await imageToBase64(personData.image);

    member
      .setTierid(tierId)
      .setProgramid(programId)
      .setPerson(person)
      .setProfileimage(profileImage);

    return new Promise((resolve, reject) => {
      this.pkClient
        .getMembershipClient()
        .updateMember(member, person, (err: any, response: any) => {
          return err ? reject(err) : resolve(response.toObject());
        });
    });
  }
}
