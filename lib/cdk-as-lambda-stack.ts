import { type StackProps, RemovalPolicy, Stack } from 'aws-cdk-lib'
import type { Construct } from 'constructs'
import { FunctionUrlAuthType, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs'
import * as path from 'node:path'

export class CdkAsLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const logGroup = new LogGroup(this, 'logs', {
      logGroupName: '/aws/lambda/cdk-as-lambda-logs',
      removalPolicy: RemovalPolicy.DESTROY,
      retention: RetentionDays.ONE_DAY,
    })

    const func = new NodejsFunction(this, 'node-function', {
      logGroup,
      entry: path.join('lib', 'functions', 'handler.ts'),
      functionName: 'cdk-as-lambda-function',
      memorySize: 1024,
      runtime: Runtime.NODEJS_20_X,
    })

    func.addFunctionUrl({ authType: FunctionUrlAuthType.NONE })
  }
}
