import * as path from "path";

// tslint:disable: no-var-requires typedef
const DotEnv = require("dotenv-webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

import {CheckerPlugin, TsConfigPathsPlugin} from "awesome-typescript-loader";
import {Configuration, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin} from "webpack";

type EnvironmentType = ("development" | "production");

const environment: EnvironmentType = process.env.NODE_ENV as EnvironmentType;
const isProduction: boolean = (environment === "production");
const projectRoot: string = path.resolve(__dirname, "../../../");
const backendPublicPath: string = "/";
const tsConfigFilePath: string = path.resolve(projectRoot, "src/tsconfig.json");

export class WebpackBuildConfig implements Configuration {

  public target: "web" = "web";

  public mode: EnvironmentType = environment;

  public stats = {
    assets: true,
    children: true,
    chunkModules: true,
    chunks: true,
    colors: false,
    modules: true,
    timings: true,
  };

  public entry = isProduction
    ? [
      path.resolve(projectRoot, "src/application/Application.ts")
    ]
    : [
      "webpack/hot/dev-server",
      path.resolve(projectRoot, "src/application/Application.ts")
    ];

  public output = {
    chunkFilename: "js/chunk:[name].js",
    filename: "js/[name].js",
    path: path.resolve(projectRoot, "target/dist"),
    publicPath: backendPublicPath,
    sourceMapFilename: "js/map/[name].bundle.map"
  };

  public resolve = {
    alias: {
      "@Api": path.resolve(projectRoot, "./src/api/"),
      "@Application": path.resolve(projectRoot, "./src/application/"),
      "@Lib": path.resolve(projectRoot, "./src/lib/"),
      "@Main": path.resolve(projectRoot, "./src/application/main"),
      "@Module": path.resolve(projectRoot, "./src/application/modules/")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [
      path.resolve(projectRoot, "src/application"),
      path.resolve(projectRoot, "node_modules")
    ],
  };

  public module = {
    rules: [
      // JS(X) files transformation\lint.
      {
        exclude: /(node_modules)/,
        loader: "awesome-typescript-loader",
        query: {
          configFileName: tsConfigFilePath
        },
        test: /\.(ts|tsx)$/
      },
      // Style loading.
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  browsers: ["ie >= 8", "last 4 version"]
                })
              ],
              sourceMap: !isProduction,
            }
          },
          "sass-loader"
        ]
      },
      // Fonts loading
      // todo: Proper config instead of url resolving.
      {
        loader: "url-loader?limit=512&name=fonts/[name].[ext]",
        test: /\.(woff|woff2|eot|ttf)$/
      },
      // Templates rendering.
      {
        loader: "handlebars-loader",
        options: {
          helperDirs: path.resolve(projectRoot, "./cli/build/template/helpers"),
          partialDirs: path.resolve(projectRoot, "./cli/build/template/partials")
        },
        test: /\.hbs$/
      },
      // Images resolving.
      {
        test: /\.(gif|png|jpe|jpg|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              // include <5KB files in our bundle file
              limit: 5000
            }
          }
        ]
      }
    ]
  };

  public devtool: any = isProduction ? false : "source-map";

  public plugins = [
    new TsConfigPathsPlugin({}),
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      environment,
      favicon: path.resolve(projectRoot, "cli/build/template/favicon.ico"),
      filename: "index.html",
      inject: true,
      minify: {
        minifyCSS: true,
        preserveLineBreaks: true,
        quoteCharacter: "'",
        removeTagWhitespace: true,
        trimCustomFragments: true
      },
      template: path.resolve(projectRoot, "cli/build/template/index.hbs")
    }),
    new DotEnv({
      path: path.resolve(projectRoot, "cli/build/config/.env")
    }),
    isProduction ? new NoEmitOnErrorsPlugin() : new HotModuleReplacementPlugin()
  ];

  /* eslint-disable camelcase */
  public optimization = {
    minimizer: [
      new TerserPlugin({
        sourceMap: !isProduction,
        terserOptions: {
          compress: {},
          ecma: 6,
          mangle: true,
          module: true,
          output: {
            beautify: false
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          unused: false,
          keep_classnames: undefined,
          keep_fnames: false,
          parse: {},
          warnings: false,
          safari10: false
        },
        extractComments: false
      })
    ],
    splitChunks: {
      automaticNameDelimiter: "~",
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -15,
          reuseExistingChunk: true
        },
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: "async" as "async",
      maxAsyncRequests: 7,
      maxInitialRequests: 5,
      maxSize: 0,
      minChunks: 1,
      minSize: 2000,
      name: true
    }
  };
  /* eslint-enable camelcase */

  public devServer = {
    compress: true,
    contentBase: "target/dist/",
    historyApiFallback: true,
    host: "0.0.0.0",
    hot: !isProduction,
    inline: !isProduction,
    port: 3000,
    proxy: [
      {
        context: [ "/api/**" ],
        secure: false,
        target: "http://localhost:8080"
      },
      {
        context: ["!/authentication/**", "/auth/**"],
        secure: false,
        target: "http://localhost:8080"
      }
    ],
    publicPath: backendPublicPath,
  };

}

export default new WebpackBuildConfig();
