export type Person = {
  email: string;
  phone: string;
  gender: number;
  firstName: string;
  middleName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  link: string;
  externalId: string;
  image: string;
};

export type EnrollPerson = Person & { externalId: string };
