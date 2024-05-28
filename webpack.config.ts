import type { RuleSetRule, ResolveOptions, Configuration } from "webpack";
import { DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";
import * as path from "path";
import { config } from "dotenv";
const env = config().parsed;

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

const configuration: Configuration = {
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
    env !== undefined
      ? new DefinePlugin({
          "process.env": JSON.stringify(process.env),
        })
      : new DefinePlugin({
          "process.env.SERVER_URL": JSON.stringify(process.env.SERVER_URL),
        }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
    }),
  ],
};

export default configuration;
