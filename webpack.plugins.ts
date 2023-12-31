import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import NodePolifillPlugin from 'node-polyfill-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new NodePolifillPlugin(),
  new MiniCssExtractPlugin(),
];
