import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export * from './pass.dto';
export * from './person.dto';

export const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
  classTransformerMetadataStorage: defaultMetadataStorage,
});
