import { Duration } from 'aws-cdk-lib';
import { ILayerVersion } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { config } from '../../../config';
import { LambdaConstruct } from '../../helpers';

export class ApiConstruct extends Construct {
  handler: NodejsFunction;

  constructor(scope: Construct, id: string, layers?: ILayerVersion[]) {
    super(scope, id);

    this.handler = LambdaConstruct(this, 'Passkit', {
      functionName: `passkit-${config.NODE_ENV}`,
      entry: 'handler',
      timeout: Duration.seconds(20),
      memorySize: 300,
      layers,
    });
  }
}