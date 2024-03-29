const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Mode = require('frontmatter-markdown-loader/mode')

let mode = 'development'
let target = 'web'
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    favicon: './src/images/favicon.png',
  }),
  new ESLintPlugin({
    extensions: ['./src', 'js'],
  }),
]

if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}
if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin())
}

module.exports = {
  mode: mode,

  target: target,

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        // type:
        //   "asset/inline": base-64 inline images in js bundle
        //   "asset/resource": images will be imported as separate resources
        //   "asset": webpack will determine, based on file size, whether it
        //            should base-64 inline the images or import them as assets.
        //            8kb is the default cutoff, which can be changed.
        type: 'asset',
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [ // these load rtl
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.BODY],
        }
      },
      {
        test: /\.json5?$/i,
        loader: 'json5-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.csv$/,
        loader: 'raw-loader',
      },
    ]
  },

  plugins: plugins,

  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      stream: false,
    }
  },

  devtool: 'inline-cheap-source-map',

  devServer: {
    hot: true,
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist'),
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      console.log()
      console.log(` _|_|_|    _|_|_|_|  _|      _|    _|_|_|  _|_|_| `)
      console.log(` _|    _|  _|        _|_|    _|  _|          _|   `)
      console.log(` _|_|_|    _|_|_|    _|  _|  _|  _|          _|   `)
      console.log(` _|    _|  _|        _|    _|_|  _|          _|   `)
      console.log(` _|    _|  _|_|_|_|  _|      _|    _|_|_|  _|_|_| `)
      console.log(`\n`)
      return middlewares
    },
  },

}
