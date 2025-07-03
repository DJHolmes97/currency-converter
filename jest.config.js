/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
const config = {
  preset: "ts-jest",
  rootDir: "./",
  modulePaths: ["<rootDir>"],
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["./utils/jest-setup.js"],
  testRegex: "/__tests__/.*test.(ts|tsx|js|jsx)$",
  /**
   * This allows for `*.module.css` files to be processed and tested properly
   * @see https://github.com/keyz/identity-obj-proxy/issues/8#issuecomment-430241345
   */
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/components$1",
    "^@/api(.*)$": "<rootDir>/api$1",
  },
  collectCoverage: true,
  coverageReporters: [
    "clover",
    "json",
    "lcov",
    "text-summary",
    ["text", { skipFull: false }],
  ],
  coverageDirectory: "coverage",
  verbose: true,
  silent: false,
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
}
export default config
