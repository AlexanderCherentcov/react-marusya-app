import { BuildOptions } from '../types/types';
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin';

export function buildBabelLoaders({ mode }: BuildOptions) {
  const isDev = mode === 'development';
  const isProd = mode == 'production';

  const plugins: any[] = [];

  // Enable React Fast Refresh when using babel-loader in development
  if (isDev) {
    plugins.push(require.resolve('react-refresh/babel'));
  }

  if (isProd) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testid'],
      },
    ]);
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: false,
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
        ],
        plugins: plugins.length ? plugins : undefined,
      },
    },
  };
}
