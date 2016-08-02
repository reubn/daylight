const webpack = require('webpack')

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
                  `css?-zindex&${(devMode ? 'localIdentName=[local]-[name]-[hash:base64:10]&' : '')}modules=true`
                ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style',
                  'css?-zindex']
      },
      {
        test: /\.(eot)|(ttf)|(woff2?)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['url?limit=10000',
                  'img?minimize=true']
      }
    ]
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
