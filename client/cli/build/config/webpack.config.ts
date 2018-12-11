import * as path from "path";

import {TsConfigPathsPlugin} from "awesome-typescript-loader";

// tslint:disable: no-var-requires
const DotEnv = require("DotEnv-webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

import {Configuration, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin} from "webpack";

type EnvironmentType = ("development" | "production");

const environment: EnvironmentType = process.env.NODE_ENV as EnvironmentType;
const isProduction: boolean = (environment === "production");
const projectRoot: string = path.resolve(__dirname, "../../../");
const backendPublicPath: string = "/";

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
      "babel-polyfill",
      path.resolve(projectRoot, "src/application/Application.tsx")
    ]
    : [
      "webpack/hot/dev-server",
      "babel-polyfill",
      path.resolve(projectRoot, "src/application/Application.tsx")
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
      "@Lib": path.resolve(projectRoot, "./src/application/lib/"),
      "@Main": path.resolve(projectRoot, "./src/application/modules/main/"),
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
          configFileName: path.resolve(projectRoot, "src/tsconfig.json")
        },
        test: /\.tsx?$/
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
        test: /\.(gif|png|jpe?g|svg)$/i,
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
    new HtmlWebpackPlugin({
      environment,
      filename: "index.html",
      favicon: path.resolve(projectRoot, "src/application/modules/main/view/assets/favicon.ico"),
      inject: true,
      minify: {
        minifyCSS: true,
        preserveLineBreaks: true,
        quoteCharacter: "'",
        removeTagWhitespace: true,
        trimCustomFragments: true
      },
      template: path.resolve(projectRoot, "src/application/index.hbs")
    }),
    new DotEnv({
      path: path.resolve(projectRoot, "cli/build/config/.env")
    }),
    isProduction ? new NoEmitOnErrorsPlugin() : new HotModuleReplacementPlugin()
  ];

  /* eslint-disable camelcase */
  public optimization = {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: !isProduction,
        uglifyOptions: {
          compress: {
            dead_code: true,
            inline: false,
            unused: true
          },
          output: {
            beautify: false,
            comments: false,
            indent_level: 2,
            max_line_len: false
          },
          toplevel: true,
          warnings: false,
        }
      })
    ]
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
    proxy: {
      "/api/*": {
        secure: false,
        target: "http://localhost:8080"
      }
    },
    publicPath: backendPublicPath,
  };

}

export default new WebpackBuildConfig();
