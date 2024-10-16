import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export * from './pass.dto';
export * from './person.dto';

export const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
  classTransformerMetadataStorage: defaultMetadataStorage,
});

// BEGIN:VCARD
// VERSION:3.0
// FN:${person.displayName}
// N:${person.name}
// EMAIL;TYPE=INTERNET:${person.emailAddress}
// TEL;TYPE=work, voice, pref, msg:${person.mobileNumber}
// END:VCARD

// $  ${universal.info}  ${members.member.externalId}
