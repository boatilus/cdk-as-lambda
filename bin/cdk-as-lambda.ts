#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CdkAsLambdaStack } from '../lib/cdk-as-lambda-stack'

const app = new cdk.App()

new CdkAsLambdaStack(app, 'CdkAsLambdaStack', {
  stackName: 'cdk-as-lambda',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
