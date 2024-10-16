import type { EnrollPerson, Person as PersonDto } from '@types';
import { FieldFilter, FilterGroup, Filters, Operator } from 'passkit-node-sdk/io/common/filter_pb';
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.pkClient.getMembershipClient().deleteMember(member, (err: any, response: any) => {
        return err ? reject(err) : resolve(response.toObject());
      });
    });
  }

  updateMember(memberId: string, personData: PersonDto) {
    const member = new Member().setId(memberId);

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

    member.setTierid('base').setProgramid('3AHrQ47tVpZcDRsNLI72T9').setPerson(person);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  listMembers(programId: string) {
    console.log('listing members', programId);
    const listRequest = new ListRequest();
    const filters = new Filters();
    const filterGroup = new FilterGroup();
    const fieldFilter = new FieldFilter();

    filterGroup.setCondition(Operator.AND);
    fieldFilter.setFilterfield('email');
    fieldFilter.setFiltervalue('keeperoleg26@gmail.com');
    fieldFilter.setFilteroperator('eq');

    filterGroup.setFieldfiltersList([fieldFilter]);
    filters.setFiltergroupsList([filterGroup]);
    filters.setLimit(5);
    listRequest.setFilters(filters);
    listRequest.setProgramid(programId);

    return new Promise((resolve, reject) => {
      return this.pkClient
        .getMembershipClient()
        .listMembers(listRequest, (err: any, response: any) => {
          console.log('------------------');
          if (err) {
            return reject(err);
          }
          return resolve(response.toObject());
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
  }
}
