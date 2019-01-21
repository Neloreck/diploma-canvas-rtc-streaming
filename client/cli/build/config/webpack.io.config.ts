import {Entry, Output} from "webpack";

import {
  BACKEND_PUBLIC_PATH,
  ENTRY_FILE_PATH,
  IS_PRODUCTION, PROJECT_OUTPUT_PATH
} from "./webpack.constants";

export const IO_CONFIG: {
  CHUNKS: any,
  ENTRY: Entry | Array<string>,
  OUTPUT: Output
} = {
  CHUNKS: {
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
    maxInitialRequests: 6,
    maxSize: 500_000,
    minChunks: 1,
    minSize: 2000,
    name: true
  },
  ENTRY: IS_PRODUCTION
    ? [ENTRY_FILE_PATH]
    : ["webpack/hot/dev-server", ENTRY_FILE_PATH],
  OUTPUT: {
    chunkFilename: "js/chunk:[name].js",
    filename: "js/[name].js",
    path: PROJECT_OUTPUT_PATH,
    publicPath: BACKEND_PUBLIC_PATH,
    sourceMapFilename: "js/map/[name].bundle.map"
  }
};
