import webpack from 'webpack';
import webpackConfig from './config/webpack.config.babel';

export class ClientBuilder {

  static STATS_PRINT_CONFIG = {
    colors: true
  };

  static build(options) {
    process.stdout.write(`Started building client bundle in ${process.env.NODE_ENV || 'unselected'} mode. \n`);

    const compiler = webpack(options);
    compiler.run(this.onFinish);
  }

  static onFinish(error, stats) {
    if (error) {
      process.stdout.write('Failed to build client bundle: ' + '\n' +
        error.toString(ClientBuilder.STATS_PRINT_CONFIG) + '\n');
    } else {
      process.stdout.write('Successfully built client bundle: ' + '\n' +
        stats.toString(ClientBuilder.STATS_PRINT_CONFIG) + '\n');
    }
  }

}

export default ClientBuilder.build(webpackConfig);
