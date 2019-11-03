const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/main.ts"),
  output: {
    path: path.resolve(__dirname, "public/"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  devtool: isDev ? "cheap-module-eval-source-map" : "source-map",
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: false,
    overlay: true,
    port: 8000,
    stats: {
      normal: true
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|ts|vue)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "vue-style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: isDev } }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          isDev ? "vue-style-loader" : MiniCSSExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: isDev } },
          { loader: "stylus-loader", options: { sourceMap: isDev } }
        ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src/")
    },
    extensions: ["*", ".js", "ts", ".vue", ".json"]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ]
};
