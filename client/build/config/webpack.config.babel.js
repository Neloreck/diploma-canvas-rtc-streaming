import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import {TsConfigPathsPlugin} from 'awesome-typescript-loader';
import {NoEmitOnErrorsPlugin} from 'webpack';
import autoprefixer from 'autoprefixer';

const environment = process.env.NODE_ENV;
const isProduction = environment === 'production';
const projectRoot = path.resolve(__dirname, '../../');
const backendPublicPath = '/public/spa/';

export class WebpackBuildConfig {

  mode = environment;

  stats = {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true
  };

  entry = [
    'babel-polyfill',
    path.resolve(projectRoot, 'src/application/main.ts')
  ];

  output = {
    path: path.resolve(projectRoot, 'target/'),
    publicPath: backendPublicPath,
    filename: 'js/[name].bundle.js',
    sourceMapFilename: 'js/map/[name].bundle.map'
  };

  resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [
      path.resolve(projectRoot, 'src/application'),
      path.resolve(projectRoot, 'src/lib'),
      path.resolve(projectRoot, 'node_modules')
    ],
    alias: {
      '@App': path.resolve(projectRoot, './src/application/'),
      '@Store': path.resolve(projectRoot, './src/application/data/store/'),
      '@Lib': path.resolve(projectRoot, './src/lib/'),
      '@Test': path.resolve(projectRoot, './src/test/')
    }
  };

  module = {
    rules: [
      // JS(X) files transformation\lint.
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: 'awesome-typescript-loader',
        query: {
          configFileName: path.resolve(projectRoot, 'src/tsconfig.json')
        }
      },
      // Style loading.
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              plugins: [
                autoprefixer({
                  browsers:['ie >= 8', 'last 4 version']
                })
              ]
            }
          },
          'sass-loader'
        ]
      },
      // Templates rendering.
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: path.resolve(projectRoot, './build/template/helpers'),
          partialDirs: path.resolve(projectRoot, './build/template/partials')
        }
      },
      // Images resolving.
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // include <10KB files in our bundle file
              limit: 10000
            }
          }
        ]
      }
    ]
  };

  devtool = isProduction ? false : 'source-map';

  plugins = [
    new TsConfigPathsPlugin({
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: path.resolve(projectRoot, 'src/application/index.hbs'),
      environment: environment,
      minify: {
        minifyCSS: true,
        preserveLineBreaks: true,
        quoteCharacter: '\'',
        trimCustomFragments: true,
        removeTagWhitespace: true
      }
    }),
    new Dotenv({
      path: path.resolve(projectRoot, 'src/build/.env')
    }),
    // Do not finish build, if any error's present.
    new NoEmitOnErrorsPlugin()
  ];

  /* eslint-disable camelcase */
  optimization = {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: !isProduction,
        uglifyOptions: {
          warnings: false,
          toplevel: true,
          compress: {
            inline: false,
            unused: true,
            dead_code: true
          },
          output: {
            comments: false,
            indent_level: 2,
            beautify: false,
            max_line_len: false
          }
        }
      })
    ]
  };
  /* eslint-enable camelcase */

  devServer = {
    contentBase: 'target/',
    publicPath: backendPublicPath,
    historyApiFallback: true,
    compress: true,
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080',
        secure: false
      }
    }
  }

}

export default new WebpackBuildConfig();
