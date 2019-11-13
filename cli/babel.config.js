module.exports = {
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [
    [require.resolve('@babel/plugin-transform-runtime'), { corejs: 2 }],
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
  ],
};
