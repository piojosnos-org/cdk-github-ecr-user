#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MainStack } from '../lib/main-stack';

const app = new cdk.App();

const prodEnv = { };

new MainStack(app, 'GitHubEcrUser', 'github-ecr-user', {
  env: prodEnv
});
