/* eslint-disable */
import { pathsToModuleNameMapper } from 'ts-jest';
import type { JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: `${compilerOptions.baseUrl}`,
  roots: ['<rootDir>'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: ['./src/**/*.ts'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [compilerOptions.baseUrl],
  moduleDirectories: [__dirname, 'node_modules'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(nest-typed-config)/)', '<rootDir>/dist/'],
};

export default jestConfig;
/* eslint-enable */
