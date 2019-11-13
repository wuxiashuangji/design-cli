import fs from 'fs';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import gulp from 'gulp';
import { Signale } from 'signale';
import JSZip from 'jszip';
import { spawnSync } from 'child_process';
import getWebpackConfig from './config/webpackConfig';
import getGulpConfig from './config/gulpConfig';
import { getProjectPath, fileTree, FileInfo } from './utils';

// eslint-disable-next-line
const { name, version } = require(getProjectPath('package.json'));

const isZarmGroup = () => name === 'zarm' || name === 'zarm-web';

const wirte = (dir, code) => {
  fs.writeSync(fs.openSync(dir, 'w'), code);
};

const getZarmConfig = () => {
  return {
    plugins: [
      new webpack.BannerPlugin(`
        ${name} v${version}

        Github: https://github.com/ZhonganTechENG/${name}

        Copyright (c) 2013-present, ZhonganTech, Inc.

        This source code is licensed under the MIT license found in the
        LICENSE file in the root directory of this source tree.
      `),
    ],
  };
};

// print error
const showErrors = (errors) => {
  console.error('zarm cli: ');
  errors.forEach((e) => {
    console.error(`  ${e}`);
  });
  process.exit(2);
};

// build for umd
const umdBuild = async ({ mode, path, outDir, outZip, libraryName }, barActive) => {
  if (isZarmGroup()) {
    path = path || 'components/style/entry.tsx,components/index.tsx';
    outDir = outDir || 'dist';
  }
  libraryName = libraryName || name;

  const entryKey = mode === 'umd-zip' ? 'index' : libraryName;
  const entryFiles = path.split(',').map((p) => getProjectPath(p));

  const umdTask = (type) => {
    return new Promise((resolve, reject) => {
      const config = webpackMerge(
        getWebpackConfig(type),
        {
          entry: {
            [entryKey]: entryFiles,
          },
          output: {
            path: getProjectPath(outDir),
            library: libraryName,
          },
        },
        isZarmGroup() && getZarmConfig(),
      );

      return webpack(config).run((err, stats) => {
        return err ? reject(err) : resolve(stats);
      });
    });
  };

  barActive.process('building...');

  if (mode === 'umd-zip') {
    await umdTask('umd-zip');

    const jsZip = new JSZip();
    const list: FileInfo[] = [];

    fileTree(list, outDir);
    jsZip.file(`${outDir}/manifest.json`, `{
  "indicate": "${libraryName}",
  "name": "${libraryName}",
  "propsSchema": {

  }
}`);
    list.forEach(({ filePath }) => {
      jsZip.file(filePath, fs.readFileSync(filePath));
    });

    jsZip.folder(outDir).generateAsync({ type: 'nodebuffer' }).then((content) => {
      wirte(`${outZip}/${libraryName}.zip`, content);
    });
  } else {
    await umdTask('umd');
    await umdTask('umd-ugly');
  }

  barActive.success('Compiled successfully!');
};

// build for lib, es
const buildLibrary = ({ mode, path, ext, outFile, outDir, copyFiles }, barActive) => {
  if (isZarmGroup()) {
    path = path || 'components';
    outDir = outDir || (mode === 'native') ? 'components' : mode;
    copyFiles = !(mode === 'native');
  }

  const args = [
    require.resolve('@babel/cli/bin/babel'),
    path,
    '-m', mode === 'lib' ? 'commonjs' : 'es6',
    '--extensions', ext,
    '--ignore', '**/*.d.ts',
    '--config-file', require.resolve(`./config/babelConfig/${mode}`),
  ];

  if (copyFiles) {
    args.push('--copy-files');
  }

  if (outDir) {
    args.push('--out-dir', outDir);
  }

  if (outFile) {
    args.push('--out-file', outFile);
  }

  if (mode === 'native') {
    args.push('--jsx', 'react-native');
  }

  barActive.process('building...');
  const result = spawnSync('node', args);

  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status);
  } else {
    if (isZarmGroup()) {
      barActive.process('building css files');
      if (mode !== 'native') {
        getGulpConfig(outDir, () => {
          barActive.success('Compiled successfully!');
        })(gulp);
        return;
      }
    }

    barActive.success('Compiled successfully!');
  }
};

export default async (options) => {
  const { mode, path, outFile, outDir, outZip } = options;
  const errors = [];
  if (!mode) {
    errors.push('--mode requires define');
  }

  if (mode === 'umd-zip' && !outZip) {
    errors.push('--out-zip requires foldername');
  }

  if (!isZarmGroup()) {
    if (!path) {
      errors.push('--path requires define');
    }

    if (!outDir && !outFile) {
      if (!outDir) {
        errors.push('--out-dir requires foldername');
      }
      if (!outFile) {
        errors.push('--out-file requires filename');
      }
    }
  }

  errors.length && showErrors(errors);

  const barActive = new Signale({
    scope: 'Zarm',
    interactive: true,
    types: {
      process: {
        badge: '●',
        color: 'yellow',
        label: `build ${mode}`,
      },
      success: {
        label: `build ${mode}`,
      },
    },
  });

  // umd编译模式;
  if (mode === 'umd' || mode === 'umd-zip') {
    umdBuild(options, barActive);
    return;
  }

  buildLibrary(options, barActive);
};
