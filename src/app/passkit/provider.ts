/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EnrollPerson, Person as PersonDto } from '@types';
import { FieldFilter, FilterGroup, Filters } from 'passkit-node-sdk/io/common/filter_pb';
import { Person } from 'passkit-node-sdk/io/common/personal_pb';
import { ListRequest, Member } from 'passkit-node-sdk/io/member/member_pb';

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

    const person = new Person();
    if (personData.firstName) {
      person.setForename(personData.firstName);
    }
    if (personData.gender) {
      person.setGender(personData.gender);
    }
    if (personData.phone) {
      person.setMobilenumber(personData.phone);
    }
    if (personData.email) {
      person.setEmailaddress(personData.email);
    }
    if (personData.externalId) {
      person.setExternalid(personData.externalId);
    }
    if (personData.companyName) {
      person.addOthernames(personData.companyName, 0);
    }
    if (personData.jobTitle) {
      person.addOthernames(personData.jobTitle, 1);
    }
    if (personData.lastName) {
      person.addOthernames(personData.lastName, 2);
    }
    if (personData.link) {
      person.addOthernames(personData.link, 3);
    }
    if (personData.image) {
      person.addOthernames(personData.image, 4);
    }

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
    const person = new Person()
      .setForename(personData.firstName)
      .setGender(personData.gender)
      .setMobilenumber(personData.phone)
      .setDisplayname(personData.middleName)
      .setEmailaddress(personData.email)
      .setExternalid(personData.externalId)
      .setOthernamesList([
        personData.companyName,
        personData.jobTitle,
        personData.lastName,
        personData.link,
      ]);

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

  async listMembers(programId: string) {
    console.log('listing members', programId);
    const listRequest = new ListRequest();
    const filters = new Filters();
    const filterGroup = new FilterGroup();
    const fieldFilter = new FieldFilter();

    // filterGroup.setCondition(Operator.AND);
    // fieldFilter.setFilterfield('passStatus');
    // fieldFilter.setFiltervalue('PASS_ISSUED');
    // fieldFilter.setFilteroperator('eq');

    // filterGroup.setFieldfiltersList([fieldFilter]);
    // filters.setFiltergroupsList([filterGroup]);
    filters.setLimit(5);
    // listRequest.setFilters(filters);
    listRequest.setProgramid('programId');

    try {
      const resp = await new Promise((resolve, reject) => {
        return this.pkClient
          .getMembershipClient()
          .listMembers(listRequest, (err: any, response: any) => {
            if (err) {
              return reject(err);
            }
            return resolve(response);
          });

        // memberList.on('List data', (data: any) => {
        //   console.log('Received:', data);
        // });

        // memberList.on('end', () => {
        //   console.log('Stream ended');
        // });

        // memberList.on('error', (err: any) => {
        //   reject(err);
        // });
      });

      return resp;
    } catch (err: any) {
      console.log('ddddddaa-------------');
      return Promise.resolve(err);
    }
  }
}
