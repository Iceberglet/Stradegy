var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: ['./index.js'],
  resolve: {
    root: [
      path.resolve('./modules')
    ],
    alias: {
        app: path.resolve('./app')

    },
    extensions: ['', '.js', '.jsx', '.css','.scss']
  },
  output: {
    path: '../app/',
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'Reacted'
  },
  module: {
    loaders: [{
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css!sass'
      },{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015','react','stage-2']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015','react','stage-2']
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}
