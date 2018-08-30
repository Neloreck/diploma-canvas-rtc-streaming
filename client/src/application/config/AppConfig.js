export class AppConfig {

  getEnv = () => process.env.NODE_ENV;
  isDev = () => process.env.NODE_ENV === 'development';

}
