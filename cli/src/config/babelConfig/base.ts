export default {
  presets: [
    [require.resolve('@babel/preset-env'), {
      modules: false,
    }],
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-transform-runtime'),
  ],
  env: {
    test: {
      plugins: [
        require.resolve('@babel/plugin-transform-modules-commonjs'),
      ],
    },
  },
};
