import path from 'path'
import webpack from 'webpack'
import clone from 'lodash/cloneDeep'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'

const PROD = process.env.NODE_ENV === 'production'

const presets = (targets) => [['@babel/preset-env', { targets }], '@babel/typescript']

const plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development',
  }),
  new LodashModuleReplacementPlugin({
    caching: true,
    cloning: true,
  }),
]

if (PROD) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new (class {
      apply(compiler) {
        compiler.hooks.emit.tap('RemoveLicenseFilePlugin', (compilation) => {
          for (let name in compilation.assets) {
            if (name.endsWith('LICENSE.txt')) {
              delete compilation.assets[name]
            }
          }
        })
      }
    })(),
  )
}

const baseFileName = `contentful-management`

const baseBundleConfig = {
  mode: PROD ? 'production' : 'development',
  context: path.join(__dirname, 'lib'),
  entry: ['./contentful-management.ts'],
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    fallback: {
      os: false,
    },
  },
  devtool: PROD ? false : 'source-map',
  plugins,
  // Show minimal information, but all errors and warnings
  // Except for log generation which have to contain all information
  stats: process.env.WEBPACK_MODE === 'log' ? 'verbose' : 'normal',
}

const defaultBabelLoader = {
  test: /\.(ts|js)x?$/,
  include: [path.resolve(__dirname, 'lib'), path.resolve(__dirname, 'test')],
  loader: 'babel-loader',
  options: {
    presets: [],
  },
}

// Browsers
const browserBundle = clone(baseBundleConfig)
browserBundle.module.rules = [
  Object.assign({}, defaultBabelLoader, {
    options: Object.assign({}, defaultBabelLoader.options, {
      presets: presets({
        browsers: ['last 2 versions', 'not ie < 13', 'not android < 50'],
      }),
      envName: 'browser',
    }),
  }),
]
browserBundle.output.filename = `${baseFileName}.browser${PROD ? '.min' : ''}.js`

// Node
const nodeBundle = clone(baseBundleConfig)
nodeBundle.module.rules = [
  Object.assign({}, defaultBabelLoader, {
    options: Object.assign({}, defaultBabelLoader.options, {
      envName: 'node',
      presets: presets({
        node: '14',
      }),
    }),
  }),
]
nodeBundle.target = 'node'
nodeBundle.output.libraryTarget = 'commonjs2'
nodeBundle.output.filename = `${baseFileName}.node${PROD ? '.min' : ''}.js`
delete nodeBundle.node

module.exports = [browserBundle, nodeBundle]
