import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SentryCliPlugin from '@sentry/webpack-plugin';
import getWebpackConfig from './config/webpackConfig';
import { getProjectPath } from './utils';

// eslint-disable-next-line
const { name, version } = require(getProjectPath('package.json'));

export interface IDeploytConfig {
  pushGh: boolean;
  outDir: string;
}

export const getCustomConfig = (config: Configuration) => {
  if (name === 'zarm') {
    config.entry = {
      index: ['./site/web/index.js'],
      demo: ['./site/demo/index.js'],
    };
    config.module.rules[0].use[0].options.plugins.push(
      // plugin-babel-import config
      [require.resolve('babel-plugin-import'), { libraryName: 'dragon-ui', style: true }, 'dragon-ui'],
    );
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './site/web/index.html',
        filename: 'index.html',
        chunks: ['manifest', 'index'],
        favicon: './site/favicon.ico',
      }),
      new HtmlWebpackPlugin({
        template: './site/demo/index.html',
        filename: 'demo.html',
        chunks: ['manifest', 'demo'],
        favicon: './site/favicon.ico',
      }),
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      zarm: getProjectPath('components'),
      '@': getProjectPath('/'),
      '@site': getProjectPath('site'),
    };
  } else if (name === 'zarm-web') {
    config.entry = {
      index: ['./site/index.js'],
    };
    // config.module.rules[0].exclude = [/[/\\\\]node_modules[/\\\\](?!zarm)/];
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './site/index.html',
        filename: 'index.html',
        chunks: ['manifest', 'index'],
        favicon: './site/favicon.ico',
      }),
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      'zarm-web': getProjectPath('components'),
      '@': getProjectPath('/'),
      '@site': getProjectPath('site'),
    };
  }
  return config;
};

export default ({ pushGh, outDir }: IDeploytConfig) => {
  const config = getCustomConfig(getWebpackConfig('deploy'));
  config.output.path = getProjectPath(outDir);

  pushGh && config.plugins.push(
    new SentryCliPlugin({
      release: version,
      include: outDir,
      sourceMapReference: false,
    }),
  );
  webpack(config).run(() => {});
};
