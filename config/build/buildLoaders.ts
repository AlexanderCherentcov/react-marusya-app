import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { BuildOptions } from './types/types';
import { buildBabelLoaders } from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const assetLoader = {
    test: /\.(png|jpe?g|gif|webp|avif)$/i,
    type: 'asset/resource',
  };

  // SVGR: SVG как React-компоненты
  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              { name: 'convertColors', params: { currentColor: true } },
            ],
          },
        },
      },
    ],
  };

  // Общая цепочка для стилей — разделяем на модули и глобальные через oneOf
  const stylesLoader: ModuleOptions['rules'][number] = {
    test: /\.(s[ac]ss|css)$/i,
    oneOf: [
      // 1) CSS Modules: только *.module.(css|scss|sass)
      {
        test: /\.module\.(s[ac]ss|css)$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: true, // важно для default-импорта: import s from '...'
              modules: {
                auto: true, // включать модули только по *.module.*
                localIdentName: isDev
                  ? '[path][name]__[local]'
                  : '[hash:base64:8]',
              },
              // sourceMap: isDev, // по желанию
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // убирает спам warning'ов из зависимостей
              sassOptions: { quietDeps: true },
              // sourceMap: isDev,
            },
          },
        ],
      },

      // 2) Глобальные стили: остальные *.scss/*.css (без modules)
      {
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: true, // пусть будет явно
              modules: false, // строго выключено
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { quietDeps: true },
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
  };

  const babelLoader = buildBabelLoaders(options);

  return [assetLoader, stylesLoader, tsLoader, babelLoader, svgrLoader];
}
