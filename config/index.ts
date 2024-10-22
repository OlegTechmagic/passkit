import * as dotenv from 'dotenv';
import { join } from 'path';

const envPath = join(__dirname + '/../.env.' + (process.env.NODE_ENV ?? 'development'));

dotenv.config({ path: envPath });

type Config = {
  PASSKIT_ADDRESS: string;
  PASSKIT_PORT: string;
  PASSKIT_PASSPHRASE: string;
  AWS_REGION: string;
  AWS_ACCOUNT: string;
  NODE_ENV: string;
  KEY_PEM: string;
  CERTIFICATE_PEM: string;
  CA_CHAIN: string;
  X_API_KEY: string;
};

export const config: Config = {
  PASSKIT_ADDRESS: process.env.PASSKIT_ADDRESS ?? '',
  PASSKIT_PORT: process.env.PASSKIT_PORT ?? '443',
  PASSKIT_PASSPHRASE: process.env.PASSKIT_PASSPHRASE ?? '',
  AWS_REGION: process.env.AWS_REGION ?? '',
  AWS_ACCOUNT: process.env.AWS_ACCOUNT ?? '',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  KEY_PEM: process.env.KEY_PEM ?? '',
  CERTIFICATE_PEM: process.env.CERTIFICATE_PEM ?? '',
  CA_CHAIN: process.env.CA_CHAIN ?? '',
  X_API_KEY: process.env.X_API_KEY ?? '',
};
