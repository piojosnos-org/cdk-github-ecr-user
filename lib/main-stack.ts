import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, namePrefix: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ecr_user = new iam.User(this, namePrefix, {
      userName: namePrefix,
    });

    // --------------------------------------------------------------------------------

    const ecr_user_policy = new iam.Policy(this, 'Policy', {
      policyName: 'ecr_repository',
      statements: [
        new iam.PolicyStatement({
          actions: ['ecr:GetAuthorizationToken'],
          resources: ['*'],
        }),
      ],
    });

    ecr_user_policy.attachToUser(ecr_user);

    // --------------------------------------------------------------------------------

    const ecr_user_access_key = new iam.CfnAccessKey(this, namePrefix + '_access_key', {
      userName: ecr_user.userName
    })

    new cdk.CfnOutput(this, 'accessKeyId',      { value: ecr_user_access_key.ref });
    new cdk.CfnOutput(this, 'secretAccessKey',  { value: ecr_user_access_key.attrSecretAccessKey });
  }
}
