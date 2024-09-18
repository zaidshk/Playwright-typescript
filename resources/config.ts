import { Environment, generateUrlByEnvironment, getFrontendURLByEnvironment, getLandingURLByEnvironment } from '@ajar-online/ajar-utils';

const hasExternalEnv = [Environment.Local, Environment.Dev, Environment.Prod, Environment.Production].includes(process.env.ENVIRONMENT as Environment)

export const data = {
  environment: hasExternalEnv ?
    process.env.ENVIRONMENT as Environment :
    Environment.Local, // change this one for personal use
  screenshotsDir: `${__dirname}/../screenshots`,
  useGenerateTestDataFromFile: process.env.USEGENERATETESTDATAFROMFILE ?
    process.env.USEGENERATETESTDATAFROMFILE === 'true' :
    false, // change this one for personal use
  useCreateUserFromFile: process.env.USECREATEUSERFROMFILE ?
    process.env.USECREATEUSERFROMFILE === 'true' :
    false, // change this one for personal use
}

export const frontendUrl = getFrontendURLByEnvironment(data.environment)
export const backendUrl = generateUrlByEnvironment(data.environment)
export const landingUrl = getLandingURLByEnvironment(data.environment)

console.info('Config data: ', data, '\nfrontendUrl:', frontendUrl, '\nbackendUrl: ', backendUrl, '\nlandingUrl: ', landingUrl)

export default { data, frontendUrl, backendUrl, landingUrl }
