/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js, jsx, ts, tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  coverageProvider: 'v8',
  collectCoverage: true,
  testEnvironment: 'node',
}
