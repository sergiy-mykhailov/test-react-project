const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m',
  },
};

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';
  // let cssLoader;

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),

    // create css bundle
    new ExtractTextPlugin('style.css'),

    // create index.html
    new HtmlWebpackPlugin({
      template: './src/client/index.ejs',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    // make sure script tags are async to avoid blocking html render
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),

    // preload chunks
    new PreloadWebpackPlugin(),
  ];

  if (isProd) {
    plugins.push(new UglifyJSPlugin({ // minify remove some of the dead code
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      mangle: {
        keep_classnames: true,
      },
    }));
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin(), // make hot reloading work
      new webpack.NamedModulesPlugin(), // show module names instead of numbers in webpack stats
      new webpack.NoEmitOnErrorsPlugin()); // don't spit out any errors in compiled assets
  }

  const entryPoint = isProd
    ? './src/client/index.js'
    : [
      // activate HMR for React
      'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      `webpack-dev-server/client?http://${host}:${port}`,

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',

      // the entry point of our app
      './src/client/index.js',
    ];

  return {
    entry: {
      main: entryPoint,
    },
    output: {
      path: path.resolve(__dirname, 'build/public/'),
      publicPath: '/',
      filename: 'main.js',
    },
    stats,
    devServer: {
      contentBase: './src',
      publicPath: '/',
      historyApiFallback: true,
      port,
      host,
      hot: !isProd,
      compress: isProd,
      stats,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: [/node_modules/],
        }, {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'less-loader', options: { javascriptEnabled: true } },
            ],
          }),


          // },{
          //     test: /\.(png|svg|jpg|gif)$/,
          //     loader: "file-loader?name=img/[name].[ext]"
          // },{
          //     test: /\.json$/,
          //     loader: "json-loader?name=json/[name].[ext]"
          // },{
          //     test: /\.(eot|ttf|woff|woff2)$/,
          //     loader: 'file-loader?name=fonts/[name].[ext]'
        },
      ],
    },

    plugins,
  };
};
