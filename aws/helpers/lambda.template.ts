import { config } from '@config';
import { Duration } from 'aws-cdk-lib';
import { FunctionOptions, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

type Props = {
  name: string;
  functionName: string;
  entry: string;
  handler: string;
  layers?: ILayerVersion[];
} & FunctionOptions;

export const LambdaConstruct = (scope: Construct, id: string, props: Partial<Props>) =>
  new NodejsFunction(scope, id, {
    timeout: Duration.minutes(15),
    memorySize: 300,
    retryAttempts: 0,
    runtime: Runtime.NODEJS_20_X,
    environment: {
      PASSKIT_ROOT_CERT_PATH: config.PASSKIT_ROOT_CERT_PATH,
      PASSKIT_PRIVATE_KEY_PATH: config.PASSKIT_PRIVATE_KEY_PATH,
      PASSKIT_ADDRESS: config.PASSKIT_ADDRESS,
      PASSKIT_CERTIFICATE_PATH: config.PASSKIT_CERTIFICATE_PATH,
      PASSKIT_PORT: config.PASSKIT_PORT,
      PASSKIT_PASSPHRASE: config.PASSKIT_PASSPHRASE,
      PASSKIT_PROGRAM_ID: config.PASSKIT_PROGRAM_ID,
      PASSKIT_TIER_ID: config.PASSKIT_TIER_ID,
    },
    ...props,
    entry: join(__dirname, `../../lambdas/${props.entry}.js`),
    handler: 'handler',
  });
