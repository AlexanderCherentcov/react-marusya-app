import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === 'development';
  const publicPath = process.env.PUBLIC_PATH || '/';

  return {
    mode: mode ?? 'development',
    entry: paths.entry,

    output: {
      path: paths.output,
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      chunkFilename: isDev ? '[name].js' : '[name].[contenthash].js',
      clean: true,
      publicPath: isDev ? '/' : publicPath,
    },

    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(options),
    },

    resolve: buildResolvers(options),

    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      runtimeChunk: 'single',
    },

    // Enable persistent caching to significantly speed up rebuilds
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },

    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: isDev ? buildDevServer(options) : undefined,

    infrastructureLogging: {
      level: 'warn',
    },

    stats: isDev ? 'minimal' : 'normal',
  };
}
