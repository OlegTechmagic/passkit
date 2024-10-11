export type Person = {
  name: string;
  surname: string;
  email: string;
  address1?: string;
  address2?: string;
  phone: string;
  gender: number;
  dob?: Date;
};

export type EnrollPerson = Person & { externalId: string };
