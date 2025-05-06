const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require( 'html-webpack-plugin' );

const isProd = process.env.NODE_ENV === 'production';
const LIB_NAME = 'JustPhoneMask';
const PLUGIN_NAME = 'just-phone-mask';
const BANNER_TEXT = '@author putn1k\n' +
                    `@source https://github.com/putn1k/JustPhoneMask\n` +
                    '@description Simple and easy phone number input mask plugin\n' +
                    '@license ISC';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/js/class.js',
  output: {
    clean: true,
    filename: `./${PLUGIN_NAME}.min.js`,
    library: LIB_NAME,
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  devtool: isProd ? false : 'source-map',
  plugins: [
    new webpack.BannerPlugin({
      test: /\.js$/,
      banner: BANNER_TEXT
    }),
    new HtmlPlugin( {
      template: 'src/index.html',
      minify: false,
      inject: false,
      scriptLoading: 'blocking'
    } )
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    watchFiles: ['src/index.html'],
    client: {
      overlay: true
    }
  },
  module: {
    rules: [ {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
