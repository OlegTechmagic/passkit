import { PersonDto } from '@dto';
import { Person } from 'passkit-node-sdk/io/common/personal_pb';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPersonInstance = (member: any, person: PersonDto) => {
  const metadataMap = member.getMetadataMap();
  metadataMap.set('jobTitle', person.jobTitle);
  metadataMap.set('companyName', person.companyName);
  metadataMap.set('image', person.image);
  metadataMap.set('link', person.link);
  return new Person()
    .setForename(person.firstName)
    .setGender(person.gender)
    .setMobilenumber(person.phone)
    .setDisplayname(person.middleName)
    .setSurname(person.lastName)
    .setEmailaddress(person.email)
    .setExternalid(person.externalId)
    .setSalutation(person.gender === 0 ? 'Mr.' : 'Mrs.');
};
