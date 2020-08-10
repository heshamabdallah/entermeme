const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    libraryTarget: 'var',
    library: 'Entermeme',
    filename: 'entermeme.js',
    libraryExport: 'default',
    path: __dirname + '/dist',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  }
}
