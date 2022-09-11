import type { Config } from 'jest';

const config: Config = {
  displayName: {
    name: 'CartDrop API 2.0',
    color: 'blue',
  },
  verbose: true,
  globals: {
    'ts-jest': {
      tsconfig: `${__dirname}/tsconfig.json`,
      diagnostics: false,
    },
  },
  testTimeout: 20000,
  collectCoverageFrom: ['**/*.{js,ts}', '!**/node_modules/**'],
  transform: {
    '.(ts|js)': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
};

export default config;
