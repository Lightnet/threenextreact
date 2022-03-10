// https://webpack.js.org/loaders/babel-loader/
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js','.mjs','.jsx']
    ,fallback:{path:false}
  },
  module: {
    //rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
    //noParse:/gun\.js$|sea\.js$/,
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          //options: { // it in config file .babelrc
            //presets: ['@babel/preset-env', "@babel/preset-react"],
            //plugins:["@babel/plugin-transform-runtime"]
            //plugins:['@babel/plugin-syntax-jsx']
          //}
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  }
}