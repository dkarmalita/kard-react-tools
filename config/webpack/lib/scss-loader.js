const {
  tools,
} = global.context;

module.exports = ({
  modules = false,
  sourceMap = false,
} = {}) => [
  // {
  //   loader: tools.resolve('style-loader'),
  //   options: {
  //     sourceMap,
  //   },
  // },
  {
    loader: tools.resolve('css-loader'),
    options: {
      importLoaders: 1,
      // url: false,
      modules,
      localIdentName: '[name]_[local]_[hash:base64:5]',
    },
  },
  {
    loader: tools.resolve('postcss-loader'),
    options: {
      sourceMap,
      plugins: () => [
        tools.require('autoprefixer'),
        tools.require('postcss-easy-import'),
      ],
    },
  },
  {
    loader: tools.resolve('sass-loader'),
    options: {
      sourceMap,
    },
  },
];
