import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { spawnSync } from 'child_process';
import getWebpackConfig from './config/webpackConfig';
import { getCustomConfig } from './deploy';
import { getProjectPath } from './utils';

// eslint-disable-next-line
const { name, version } = require(getProjectPath('package.json'));

export interface IDevelopmentConfig {
  mode?: 'native';
  host: string;
  port: number;
}

export default ({ mode, host, port }: IDevelopmentConfig) => {
  if (mode === 'native') {
    const args = [
      require.resolve('@babel/cli/bin/babel'),
      'components',
      '-d', 'components',
      '-m', 'es6',
      '-w',
      '--extensions', '.ts,.tsx',
      '--config-file', require.resolve('./config/babelConfig/native'),
      '--jsx', 'react-native',
    ];
    spawnSync('node', args);
    return;
  }
  const config = getCustomConfig(getWebpackConfig('dev'));
  Object.keys(config.entry).forEach((key) => {
    config.entry[key].unshift(require.resolve('react-hot-loader/patch'));
  });

  if (name === 'zarm') {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './site/demo/index_umd.html',
        filename: 'demo_umd.html',
        inject: false,
      }),
    );
  } else if (name === 'zarm-web') {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './site/index_umd.html',
        filename: 'index_umd.html',
        inject: false,
      }),
    );
  }

  const compiler = webpack(config);
  const serverConfig = {
    publicPath: '/',
    compress: true,
    noInfo: true,
    inline: true,
    hot: true,
  };
  const devServer = new WebpackDevServer(compiler, serverConfig);
  devServer.listen(port, host, (err) => {
    if (err) {
      return console.error(err);
    }
    console.warn(`http://${host}:${port}\n`);
  });

  ['SIGINT', 'SIGTERM'].forEach((sig: any) => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });
};
