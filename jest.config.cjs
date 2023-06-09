/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/server/routers/**/*",
    "!src/database/connectToDatabase.ts",
  ],
  testPathIgnorePatterns: ["node_modules"],
};
