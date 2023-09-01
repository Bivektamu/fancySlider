const path = require('path');

module.exports = {
  entry: './component/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-react-library.js',
    library: 'MyReactLibrary',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
