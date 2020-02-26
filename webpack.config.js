const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

const outputDirectory = 'dist'

console.log({
  API_DOMAIN: process.env.API_DOMAIN,
  JWT_SECRET: process.env.JWT_SECRET,
  MOCK: process.env.MOCK,
  MONGODB_URL: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV,
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
  OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI,
  PORT: process.env.PORT,
  PUBLIC_URL: process.env.PUBLIC_URL,
  UI_DOMAIN: process.env.UI_DOMAIN
})

module.exports = {
  devtool: 'inline-source-map',
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      API_DOMAIN: process.env.API_DOMAIN,
      JWT_SECRET: process.env.JWT_SECRET,
      MOCK: process.env.MOCK,
      MONGODB_URL: process.env.MONGODB_URL,
      NODE_ENV: process.env.NODE_ENV,
      OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
      OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI,
      PORT: process.env.PORT,
      PUBLIC_URL: process.env.PUBLIC_URL,
      UI_DOMAIN: process.env.UI_DOMAIN
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
}
