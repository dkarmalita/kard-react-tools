const {
  tools,
} = global.context;

const MiniCssExtractPlugin = tools.require('mini-css-extract-plugin');

module.exports = ({
  modules = false,
  sourceMap = false,
} = {}) => [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // hmr: process.env.NODE_ENV === 'development',
    },
  },
  {
    loader: tools.resolve('css-loader'),
    options: {
      importLoaders: 1,
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
