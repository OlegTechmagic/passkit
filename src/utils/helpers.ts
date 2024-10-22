import { PersonDto } from '@dto';
import { Person } from 'passkit-node-sdk/io/common/personal_pb';

export const createPersonInstance = (person: PersonDto) => {
  return new Person()
    .setForename(person.firstName)
    .setGender(person.gender)
    .setMobilenumber(person.phone)
    .setDisplayname(person.middleName)
    .setSurname(person.lastName)
    .setEmailaddress(person.email)
    .setExternalid(person.externalId)
    .setSalutation(person.jobTitle)
    .setSuffix(person.companyName)
    .setOthernamesList(person.image);
};
