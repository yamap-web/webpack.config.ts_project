import type { RuleSetRule, ResolveOptions, Configuration } from "webpack";
import "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

const rules: RuleSetRule[] = [
  {
    test: [/.ts$/, /.tsx$/],
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env"],
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
            ["@babel/preset-typescript"],
          ],
        },
      },
      {
        loader: "ts-loader",
      },
    ],
  },
];

const resolve: ResolveOptions = {
  modules: [__dirname + "/node_modules"],
  extensions: [".ts", ".tsx", ".js"],
};

const config: Configuration = {
  mode: "development",
  entry: "/src/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: "./dist",
    },
    port: 8080,
  },
  module: { rules },
  resolve,
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
    }),
  ],
};

export default config;
