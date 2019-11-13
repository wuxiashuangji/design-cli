// const { getProjectPath } = require('../../utils');

module.exports = {
  rootDir: process.cwd(),
  roots: [
    '<rootDir>/components',
  ],
  // setupFilesAfterEnv: [
  //   getProjectPath('scripts/jest/setup.js'),
  // ],
  testRegex: '/__tests__/[^.]+\\.test(\\.jsx|[^d]\\.ts)$',
  transform: {
    '^.+\\.jsx?$': require.resolve('./preprocessor'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!zarm).+\\.(js|jsx|ts|tsx)$',
  ],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/*/*.native.{ts,tsx}',
    '!components/*/PropsType.{ts,tsx}',
    '!components/**/style/*.{ts,tsx}',
    '!components/style/**/*',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  testURL: 'http://localhost',
};
