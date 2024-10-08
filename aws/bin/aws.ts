#!/usr/bin/env node
import 'source-map-support/register';
import 'reflect-metadata';

import * as cdk from 'aws-cdk-lib';

import { config } from '../../config';
import { AwsStack } from '../lib/stack';

const app = new cdk.App();
new AwsStack(app, `Passkit-${config.NODE_ENV}`, {
  env: { region: config.AWS_REGION, account: config.AWS_ACCOUNT },
});
