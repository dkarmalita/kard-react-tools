const {
  tools, target, config,
} = global.context;

const webpack = tools.require('webpack');

const { loaders, plugins } = require('./lib');

const babelConfig = tools.require('babel.config')(tools.resolve);

const isBuild = () => process.env.NODE_ENV === 'production';

const entryPoints = config.entryPoints.map(el => target.path(el));

const baseConfig = {
  entry: entryPoints,

  output: {
    path: target.path(config.distPath),
    publicPath: '/',
    // filename: 'bundle.js',
  },

  mode: process.env.NODE_ENV,

  target: 'web',

  stats: config.stats,

  module: {
    rules: [

      // {
      //   test: /\.(ts|tsx)?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: babelLoader,
      //       options: babelConfig,
      //     },
      //     {
      //       loader: tsLoader,
      //       options: {
      //         transpileOnly: true,
      //         configFileName: tools.resolve('tsconfig.json'),
      //       },
      //     },
      //   ],
      // },

      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: loaders.babelLoader,
          options: babelConfig,
        }],
      },

      {
        test: /\.module\.(css|scss)$/,
        use: [
          {
            loader: plugins.MiniCssExtractPlugin.loader,
            options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
              // publicPath: '../',
              // hmr: process.env.NODE_ENV === 'development',
            },
          },
          ...loaders.scssLoader({ sourceMap: !isBuild() }),
        ],
      },

      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.(css|scss)$/,
        // sideEffects: true,
        use: [
          {
            loader: plugins.MiniCssExtractPlugin.loader,
            options: {
              // publicPath: (resourcePath, context) => {
              //   // publicPath is the relative path of the resource to the context
              //   // e.g. for ./css/admin/main.css the publicPath will be ../../
              //   // while for ./css/main.css the publicPath will be ../
              //   return `${path.relative(path.dirname(resourcePath), context)}/`;
              // },
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              // publicPath: '../',
              // hmr: process.env.NODE_ENV === 'development',
            },
          },
          ...loaders.scssLoader({ sourceMap: !isBuild() }),
        ],
      },

      {
        test: /\.png$/,
        use: [{
          loader: loaders.urlLoader,
          options: {
            limit: 8192,
            mimetype: 'image/png',
          },
        }],
      },

      {
        test: /\.jpg$/,
        use: [{
          loader: loaders.urlLoader,
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
          loader: loaders.urlLoader,
          options: {
            limit: 8192,
            mimetype: 'image/gif',
            name: '[name].[hash:7].[ext]',
          },
        }],
      },

      {
        test: /.(svg?)(\?[a-z0-9]+)?$/,
        loader: loaders.urlLoader,
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
        loader: loaders.fileLoader,
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },

  plugins: [

    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),

    new plugins.HtmlWebpackPlugin({
      filename: 'index.html', // target name
      favid: Date.now(), // it is reffered in template and forced favicon get updated
      template: target.path(config.indexHtmlTemplate),
      publicPath: '/',
      inject: 'body',
      minify: false, // ref: https://github.com/kangax/html-minifier#options-quick-reference
    }),

    new plugins.MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  resolve: {
    extensions: [
      // '*',
      // '.ts', '.tsx',
      '.js', '.jsx', '.scss',
    ],

    modules: [
      target.path('src'),
      target.path('packages'),
      target.path('node_modules'),
      // target.path('node_modules'),
    ],

    mainFields: [
      'module',
      'main',
    ],

    alias: {
      'package.json': target.path('package.json'),
    },
  },
};

module.exports = baseConfig;
