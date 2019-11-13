// const { getProjectPath } = require('../../utils');
const transformPackages = [
  'react-native',
  'react-native-camera-roll-picker',
];

module.exports = {
  // preset: 'react-native',
  rootDir: process.cwd(),
  transform: {
    '^.+\\.jsx?$': require.resolve('./preprocessor.native'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
  },
  // setupFilesAfterEnv: [
  //   getProjectPath('scripts/jest/setup.js'),
  // ],
  testRegex: '/__tests__/.*(\\.native\\.test\\.jsx|[^d]\\.ts)$',
  collectCoverageFrom: [
    'components/**/*.native.{ts,tsx}',
    '!components/*/PropsType.{ts,tsx}',
    '!components/**/style/*.{ts,tsx}',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!(${transformPackages.join('|')})/)`,
  ],
  testEnvironment: 'jsdom',
};
