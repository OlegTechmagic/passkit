import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname + '/../.env') });

type Config = {
  PASSKIT_ROOT_CERT_PATH: string;
  PASSKIT_PRIVATE_KEY_PATH: string;
  PASSKIT_CERTIFICATE_PATH: string;
  PASSKIT_ADDRESS: string;
  PASSKIT_PORT: string;
  PASSKIT_PASSPHRASE: string;
  PASSKIT_PROGRAM_ID: string;
  PASSKIT_TIER_ID: string;
  AWS_REGION: string;
  AWS_ACCOUNT: string;
  NODE_ENV: string;

  KEY_PEM: string;
  CERTIFICATE_PEM: string;
  CA_CHAIN: string;
};

export const config: Config = {
  PASSKIT_ROOT_CERT_PATH: join(__dirname, process.env.PASSKIT_ROOT_CERT_PATH ?? ''),
  PASSKIT_PRIVATE_KEY_PATH: join(__dirname, process.env.PASSKIT_PRIVATE_KEY_PATH ?? ''),
  PASSKIT_CERTIFICATE_PATH: join(__dirname, process.env.PASSKIT_CERTIFICATE_PATH ?? ''),
  PASSKIT_ADDRESS: process.env.PASSKIT_ADDRESS ?? '',
  PASSKIT_PORT: process.env.PASSKIT_PORT ?? '443',
  PASSKIT_PASSPHRASE: process.env.PASSKIT_PASSPHRASE ?? '',
  PASSKIT_PROGRAM_ID: process.env.PASSKIT_PROGRAM_ID ?? '',
  PASSKIT_TIER_ID: process.env.PASSKIT_TIER_ID ?? '',
  AWS_REGION: process.env.AWS_REGION ?? '',
  AWS_ACCOUNT: process.env.AWS_ACCOUNT ?? '',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  KEY_PEM: process.env.KEY_PEM ?? '',
  CERTIFICATE_PEM: process.env.CERTIFICATE_PEM ?? '',
  CA_CHAIN: process.env.CA_CHAIN ?? '',
};
