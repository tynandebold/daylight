const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path    = require('path');
const isProd  = process.env.NODE_ENV === 'production';
const cssPath = isProd ? 'style.min.css' : 'style.css';

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: './',
    inline: true,
    port: 8888
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: isProd ? 'script.min.js' : 'script.js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          !isProd ? 'style-loader' :
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: cssPath,
      chunkFilename: cssPath,
    })
  ]
};
