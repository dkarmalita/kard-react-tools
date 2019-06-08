// const fs = require('fs');
// const path = require('path');

const { target, tools } = require('./utils/resolver');
// const packageJson = target.require('package.json');

const ofProject = rPath => target.fullPath(rPath);
const requireNM = pkgName => tools.require('node_modules', pkgName);
const resolveNM = pkgName => tools.resolve('node_modules', pkgName);

const webpack = requireNM('webpack');
const autoprefixer = requireNM('autoprefixer');
const cssEasyImport = requireNM('postcss-easy-import');
const CompressionPlugin = requireNM('compression-webpack-plugin');
const HtmlWebpackPlugin = requireNM('html-webpack-plugin');
const CopyWebpackPlugin = requireNM('copy-webpack-plugin');
const CleanWebpackPlugin = requireNM('clean-webpack-plugin');

const styleLoader = resolveNM('style-loader');
const cssLoader = resolveNM('css-loader');
const postcssLoader = resolveNM('postcss-loader');
const sassLoader = resolveNM('sass-loader');
const babelLoader = resolveNM('babel-loader');
// const tsLoader = resolveNM('ts-loader');
const tsLoader = resolveNM('awesome-typescript-loader');
const urlLoader = resolveNM('url-loader');
const fileLoader = resolveNM('file-loader');

const staticContentPath = ofProject('/static');
const entryPoints = [ofProject('/src/index.jsx')];
const modules = [
  ofProject('node_modules'),
  ofProject('packages'),
  ofProject('src'),
  tools.fullPath('node_modules'),
];

const packageJsonPath = ofProject('/package.json');
const distPath = ofProject('/dist');
const htmlTemplatePath = ofProject('/src/index.ejs');

const createBabelConfig = tools.require('babel.config');
const babelConfig = createBabelConfig(resolveNM);

const stats = {
  assets: true,
  children: false,
  chunks: false,
  colors: true,
  maxModules: 0,
  modules: false,
};

// eslint-disable-next-line no-shadow
const scssLoaders = ({ modules, sourceMap } = { modules: false, sourceMap: false }) => [

  {
    loader: styleLoader,
    options: {
      sourceMap,
    },
  },

  {
    loader: cssLoader,
    options: {
      importLoaders: 1,
      // url: false,
      modules,
      localIdentName: '[name]_[local]_[hash:base64:5]',
    },
  },

  {
    loader: postcssLoader,
    options: {
      sourceMap,
      plugins: () => [
        autoprefixer,
        cssEasyImport,
      ],
    },
  },

  {
    loader: sassLoader,
    options: {
      sourceMap,
    },
  },
];

const buildPlugins = () => [

  new CompressionPlugin({
    // asset: "[path].gz[query]",
    algorithm: 'gzip',
    test: /\.js$/,
    threshold: 10240,
    minRatio: 0.8,
  }),

  new CleanWebpackPlugin([distPath], {
    root: target.fullPath(), //  Useful when relative references are used in array
    verbose: true,
    dry: false,
    //  exclude: ['shared.js']
  }),

  new CopyWebpackPlugin([
    // Copy glob results (with dot files) to /absolute/path/
    { from: staticContentPath, to: '' },
  ],
  {
    ignore: [
      '.*',
      '_*',
      '*.bak',
    ],
    // By default, we only copy modified files during
    // a watch or webpack-dev-server build. Setting this
    // to `true` copies all files.
    copyUnmodified: true,
  }),
];

// eslint-disable-next-line func-names
module.exports = function (

  env,
  // An environment as the first parameter. See the environment options
  // CLI documentation for syntax examples.
  // ref: https://webpack.js.org/configuration/configuration-types/#exporting-a-function

  argv,
  // An options map (argv) as the second parameter. This describes
  // the options passed to webpack, with keys such as output-filename
  // and optimize-minimize.
  // ref: https://webpack.js.org/configuration/configuration-types/#exporting-a-function
) {
  // console.log('env', {env, argv})

  const mode = argv.mode || process.env.NODE_ENV || 'development';
  const isBuild = () => mode === 'production';

  const config = {
    mode,
    stats,
    // _isBuild: function(){ return this.mode === 'production' },
    context: target.fullPath(),
    target: 'web',
    entry: entryPoints,

    module: {
      rules: [

        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: babelLoader,
              options: babelConfig,
            },
            {
              loader: tsLoader,
              options: {
                transpileOnly: true,
                configFileName: tools.resolve('tsconfig.json'),
              },
            },
          ],
        },

        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/],
          use: [{
            loader: babelLoader,
            options: babelConfig,
          }],
        },

        {
          test: /\.module\.(css|scss)$/,
          use: scssLoaders({ modules: true, sourceMap: !isBuild() }), // FIXME
        },

        {
          test: /\.(css|scss)$/,
          exclude: /\.module\.(css|scss)$/,
          use: scssLoaders({ sourceMap: !isBuild() }),
        },

        {
          test: /\.png$/,
          use: [{
            loader: urlLoader,
            options: {
              limit: 8192,
              mimetype: 'image/png',
            },
          }],
        },

        {
          test: /\.jpg$/,
          use: [{
            loader: urlLoader,
            options: {
              limit: 8192,
              mimetype: 'image/jpg',
              name: '[name].[hash:7].[ext]',
            },
          }],
        },

        {
          test: /\.gif$/,
          use: [{
            loader: urlLoader,
            options: {
              limit: 8192,
              mimetype: 'image/gif',
              name: '[name].[hash:7].[ext]',
            },
          }],
        },
        {
          test: /.(svg?)(\?[a-z0-9]+)?$/,
          loader: urlLoader,
          query: {
            limit: 10000,
            mimetype: 'image/svg+xml',
            name: '[name].[hash:7].[ext]',
            outputPath: 'assets/',
          },
        },

        // "file" loader makes sure assets end up in the `build` folder.
        // When you `import` an asset, you get its filename.
        {
          test: [/\.eot$/, /\.ttf$/, /\.woff$/, /\.woff2$/],
          loader: fileLoader,
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },

    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.scss'],
      modules,
      mainFields: [
        'module',
        'main',
      ],
      alias: {
        'package.json': packageJsonPath,
      },
    },

    output: {
      path: distPath,
      publicPath: '/',
      filename: 'bundle.js',
    },

    plugins: [

      ...(isBuild() ? buildPlugins() : []),

      new webpack.DefinePlugin({
        'process.env': { WP_ENV: JSON.stringify(process.env.NODE_ENV) },
      }),

      new webpack.HotModuleReplacementPlugin(),

      new HtmlWebpackPlugin({
        filename: 'index.html', // target name
        favid: Date.now(), // it is reffered in template and forced favicon get updated
        template: htmlTemplatePath,
        publicPath: '/',
        inject: 'body',
        minify: false, // ref: https://github.com/kangax/html-minifier#options-quick-reference
      }),
    ],

    devServer: {
      contentBase: staticContentPath,
      historyApiFallback: true,
      hot: true,
      compress: true,
      // host: 'localhost',
      // port: 9101,
      stats,
    },
  };

  return new Promise(resolve => resolve(config));
};
