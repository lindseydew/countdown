import path, { dirname } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(dirname(''), 'src', 'index.html')
})

const config = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [htmlPlugin]
}
export default config
