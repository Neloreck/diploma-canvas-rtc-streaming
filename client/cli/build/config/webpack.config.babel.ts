import * as path from "path";

import * as autoprefixer from "autoprefixer";
import {TsConfigPathsPlugin} from "awesome-typescript-loader";
import * as Dotenv from "dotenv-webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as UglifyJSPlugin from "uglifyjs-webpack-plugin";

import {Configuration, HotModuleReplacementPlugin} from "webpack";

const environment: "development" | "production" = process.env.NODE_ENV as any;
const isProduction: boolean = environment === "production";
const projectRoot: string = path.resolve(__dirname, "../../../");
const backendPublicPath: string = "";

export class WebpackBuildConfig implements Configuration {

  public target: "web" = "web";

  public mode: "development" | "production" = environment;

  public stats = {
    assets: true,
    children: true,
    chunkModules: true,
    chunks: true,
    colors: false,
    modules: true,
    timings: true,
  };

  public entry = [
    "webpack/hot/dev-server",
    "babel-polyfill",
    path.resolve(projectRoot, "src/application/main.ts")
  ];

  public output = {
    chunkFilename: "js/chunk:[name].js",
    filename: "js/[name].js",
    path: path.resolve(projectRoot, "target/"),
    publicPath: backendPublicPath,
    sourceMapFilename: "js/map/[name].bundle.map"
  };

  public resolve = {
    alias: {
      "@Annotate": path.resolve(projectRoot, "./src/application/data/lib/annotate"),
      "@App": path.resolve(projectRoot, "./src/application/"),
      "@Components": path.resolve(projectRoot, "./src/application/view/components/"),
      "@Containers": path.resolve(projectRoot, "./src/application/view/containers/"),
      "@Layouts": path.resolve(projectRoot, "./src/application/view/layouts/"),
      "@Lib": path.resolve(projectRoot, "./src/lib/"),
      "@Redux": path.resolve(projectRoot, "./src/application/data/lib/redux"),
      "@Store": path.resolve(projectRoot, "./src/application/data/store/"),
      "@Test": path.resolve(projectRoot, "./src/test/")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [
      path.resolve(projectRoot, "src/application"),
      path.resolve(projectRoot, "src/lib"),
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
      {
        loader: "url-loader?limit=512&name=font/[name].[ext]",
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
              // include <10KB files in our bundle file
              limit: 10000
            }
          }
        ]
      }
    ]
  };

  public devtool: any = isProduction ? false : "source-map";

  public plugins = [
    new TsConfigPathsPlugin({
    }),
    new HtmlWebpackPlugin({
      environment,
      filename: "index.html",
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
    new Dotenv({
      path: path.resolve(projectRoot, "cli/build/.env")
    }),
    new HotModuleReplacementPlugin()
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
      }) as any
    ]
  };
  /* eslint-enable camelcase */

  public devServer = {
    compress: true,
    contentBase: "target/",
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
