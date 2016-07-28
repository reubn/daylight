const webpack = require('webpack')

const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: ['babel-polyfill', './front/index.js'],
  output: {
    path: './front/compiled',
    filename: 'bundle.js'
  },
  devtool: devMode ? 'source-map' : undefined,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style',
                  `css?${(devMode ? 'localIdentName=[local]-[name]-[hash:base64:10]&' : '')}modules=true&importLoaders=1`,
                  'postcss']
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style',
                  'css?importLoaders=1',
                  'postcss']
      }, {
        test: /\.(eot)|(svg)|(ttf)|(woff2?)|(png)|(jpe?g)$/,
        loader: 'file-loader'
      }
    ]
  },
  postcss(){
    return [autoprefixer, cssnano]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      __DEVTOOLS__: devMode
    }),
    new webpack.optimize.OccurrenceOrderPlugin()],
  resolve: {
    modulesDirectories: ['node_modules', 'components', 'actions', 'front/node_modules'],
    extensions: ['', '.js', '.jsx', '.css']
  },
  resolveLoader: {
    alias: {
      lazy: 'es6-promise-loader'
    }
  }
}

if(!devMode){
  module.exports.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    minimize: !devMode,
    output: {
      comments: devMode
    }
  }))}
