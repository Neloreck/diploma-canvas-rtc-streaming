import * as path from "path";

const root: string = path.resolve(__dirname, "../../../");
// For a detailed explanation regarding each config property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  // automock: false,

  // bail: false,

  // browser: false,

  // cacheDirectory: "/var/folders/nd/fmdkftmj11l8f2m9lnh_y70w0000gn/T/jest_dx",

  clearMocks: true,

  // collectCoverage: false,

  // collectCoverageFrom: null,

  coverageDirectory: "<rootDir>/target/coverage:report",

  coveragePathIgnorePatterns: [
    "/node_modules/"
   ],

  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // coverageThreshold: null,

  // errorOnDeprecated: false,

  // forceCoverageMatch: [],

  // globalSetup: null,

  // globalTeardown: null,

  // moduleDirectories: [
  //   "node_modules"
  // ],

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],

  moduleNameMapper: {
    "@Annotate$": "<rootDir>/src/main/data/lib/annotate/index",
    "@Redux": "<rootDir>/./src/main/data/lib/redux/index",

    "@Components/(.*)$": "<rootDir>/./src/main/view/components/$1",
    "@Containers/(.*)$": "<rootDir>/./src/main/view/containers/$1",
    "@Layouts/(.*)$": "<rootDir>/./src/main/view/layouts/$1",
    "@Store/(.*)$": "<rootDir>/./src/main/data/store/$1",

    "@App/(.*)$": "<rootDir>/src/main/$1",
    "@Lib/(.*)$": "<rootDir>/src/lib/$1",
    "@Test/(.*)$": "<rootDir>/src/__test__/$1",
    "\\.(css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__test__/mocks/nonJSModule.js",
  },

  // notify: false,

  // notifyMode: "always",

  // preset: null,

  // projects: null,

  // reporters: undefined,

  // resetMocks: false,

  // resetModules: false,

  // resolver: null,

  // restoreMocks: false,

  rootDir: root,

  roots: [
    "<rootDir>"
  ],

  // runner: "jest-runner",

  // setupFiles: [],

  // setupTestFrameworkScriptFile: null,

  // snapshotSerializers: [],

  // testEnvironment: "jest-environment-jsdom",

  // testEnvironmentOptions: {},

  // testLocationInResults: false,

  testMatch: [
     "**/__tests__/**/*.ts?(x)",
     "**/?(*.)+(Spec|__test__).ts?(x)"
   ],

  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  // testResultsProcessor: null,

  // testRunner: "jasmine2",

  // testURL: "about:blank",

  // timers: "real",

  transform: {
      "^.+\\.tsx?$": "ts-jest"
  },

  transformIgnorePatterns: [
    "/node_modules/"
  ],

  // unmockedModulePathPatterns: undefined,

  verbose: true,

  // watchPathIgnorePatterns: [],

  // watchman: true,

    globals: {
    "ts-jest": {
      tsConfigFile: path.resolve(__dirname, "./tsconfig.json"),
    }
  }

};
