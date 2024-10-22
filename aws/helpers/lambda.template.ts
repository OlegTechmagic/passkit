import { Duration } from 'aws-cdk-lib';
import { FunctionOptions, ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

import { config } from '../../config/index';

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
      PASSKIT_ADDRESS: config.PASSKIT_ADDRESS,
      PASSKIT_PORT: config.PASSKIT_PORT,
      PASSKIT_PASSPHRASE: config.PASSKIT_PASSPHRASE,
      KEY_PEM: config.KEY_PEM,
      CERTIFICATE_PEM: config.CERTIFICATE_PEM,
      CA_CHAIN: config.CA_CHAIN,
      NODE_ENV: config.NODE_ENV,
      X_API_KEY: config.X_API_KEY,
    },
    ...props,
    entry: join(__dirname, `../../lambdas/${props.entry}.js`),
    handler: 'handler',
  });
