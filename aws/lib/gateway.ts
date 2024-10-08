import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { config } from '../../config';

export class ApiGateway extends Construct {
  restApi: RestApi;

  constructor(scope: Construct, id: string, handler: NodejsFunction) {
    super(scope, id);

    this.restApi = new RestApi(this, 'passkit', {
      restApiName: `passkit`,
      deployOptions: { stageName: config.NODE_ENV },
      binaryMediaTypes: ['*/*'],
    });

    const integration = new LambdaIntegration(handler, { proxy: true, allowTestInvoke: false });

    const resource = this.restApi.root.addResource('app');
    resource.addMethod('ANY', integration);
    resource.addProxy({ defaultIntegration: integration, anyMethod: true });
  }
}
