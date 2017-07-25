const path = require('path')

const webpack = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')

const PROD = process.env.NODE_ENV === 'production'

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.IgnorePlugin(/vertx/),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

if (PROD) {
  plugins.push(
    new BabiliPlugin()
  )
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  )
}

module.exports = [
  {
    // Browser
    context: path.join(__dirname, 'lib'),
    entry: './contentful-management.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `contentful-management${PROD ? '.min' : ''}.js`,
      libraryTarget: 'umd',
      library: 'contentfulManagement'
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components|dist)/,
          loader: 'babel-loader',
          options: {
            env: 'browser'
          }
        }
      ],
      noParse: (content) => {
        return /clone/.test(content)
      }
    },
    devtool: PROD ? false : 'source-map',
    plugins: plugins
  },
  {
    // Node
    context: path.join(__dirname, 'lib'),
    entry: './contentful-management.js',
    target: 'node',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `contentful-management.node${PROD ? '.min' : ''}.js`,
      libraryTarget: 'commonjs2',
      library: 'contentfulManagement'
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components|dist)/,
          loader: 'babel-loader',
          options: {
            env: 'node'
          }
        }
      ],
      noParse: (content) => {
        return /clone/.test(content)
      }
    },
    devtool: PROD ? false : 'source-map',
    plugins: plugins
  }
]
