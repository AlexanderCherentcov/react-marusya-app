/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @example {"favorites":["98","98"],"surname":"James","name":"John","email":"john@email.com"} */
export interface User {
  /** @example "John" */
  name?: string;
  /** @example "James" */
  surname?: string;
  /** @example "john@email.com" */
  email?: string;
  /** Массив с ID фильмов добавленными в избранное */
  favorites?: string[];
}

export interface AuthInfo {
  /** @example "test@test.com" */
  email: string;
  /** @example "d4Sv{3d23f" */
  password: string;
}

/** @example {"result":true} */
export interface SuccessfulResult {
  result: boolean;
}

export interface Error {
  error: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  surname?: string;
}

/** @example {"keywords":["keywords","keywords"],"backdropUrl":"backdropUrl","production":"production","trailerYoutubeId":"trailerYoutubeId","language":"language","tmdbRating":5,"title":"title","cast":["cast","cast"],"revenue":"revenue","posterUrl":"posterUrl","plot":"plot","genres":["genres","genres"],"id":0,"budget":"budget","languages":["languages","languages"],"releaseDate":"releaseDate","director":"director","awardsSummary":"awardsSummary","runtime":1,"trailerUrl":"trailerUrl","relaseYear":6,"countriesOfOrigin":["countriesOfOrigin","countriesOfOrigin"],"originalTitle":"originalTitle","searchL":"searchL","homepage":"homepage","status":"status"} */
export interface Movie {
  id?: number;
  title?: string;
  originalTitle?: string;
  language?: string;
  releaseYear?: number;
  releaseDate?: string;
  genres?: string[];
  plot?: string;
  runtime?: number;
  budget?: string;
  revenue?: string;
  homepage?: string;
  status?: string;
  posterUrl?: string;
  backdropUrl?: string;
  trailerUrl?: string;
  trailerYoutubeId?: string;
  tmdbRating?: number;
  searchL?: string;
  keywords?: string[];
  countriesOfOrigin?: string[];
  languages?: string[];
  cast?: string[];
  director?: string;
  production?: string;
  awardsSummary?: string;
}

export interface ApiResponse {
  /** @format int32 */
  code?: number;
  type?: string;
  message?: string;
}

export interface FavoritesBody {
  id: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '{server}';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      key => 'undefined' !== typeof query[key],
    );
    return keys
      .map(key =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async response => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch(e => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Movie API 1.0
 * @version 1.0.0
 * @baseUrl {server}
 * @externalDocs http://swagger.io
 *
 * Данная API предоставляет набор URL, делая запросы на которые Вы получите данные, необходимые для выполнения дипломной работы.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * @description Принимает адрес почты:пароль, открывает новую пользовательскую сессию
     *
     * @tags auth
     * @name AuthLoginPost
     * @summary Логин пользователя по почте:паролю
     * @request POST:/auth/login
     */
    authLoginPost: (data: AuthInfo, params: RequestParams = {}) =>
      this.request<SuccessfulResult, void>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthLogoutGet
     * @summary Закрытие текущей пользовательской сессии
     * @request GET:/auth/logout
     */
    authLogoutGet: (params: RequestParams = {}) =>
      this.request<SuccessfulResult, any>({
        path: `/auth/logout`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags auth
     * @name UserPost
     * @summary Регистрация/Создание пользователя
     * @request POST:/user
     */
    userPost: (data: RegisterData, params: RequestParams = {}) =>
      this.request<SuccessfulResult, Error>({
        path: `/user`,
        method: 'POST',
        body: data,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags auth
     * @name ProfileGet
     * @summary Получение данных о текущем авторизованном пользователе
     * @request GET:/profile
     */
    profileGet: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/profile`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  favorites = {
    /**
     * No description
     *
     * @tags favorites
     * @name FavoritesGet
     * @summary Получение избранных фильмов
     * @request GET:/favorites
     */
    favoritesGet: (params: RequestParams = {}) =>
      this.request<Movie[], any>({
        path: `/favorites`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags favorites
     * @name FavoritesPost
     * @summary Добавление фильма в избранное
     * @request POST:/favorites
     */
    favoritesPost: (data: FavoritesBody, params: RequestParams = {}) =>
      this.request<User, Error>({
        path: `/favorites`,
        method: 'POST',
        body: data,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags favorites
     * @name FavoritesMovieIdDelete
     * @summary Удаление фильма из избранного
     * @request DELETE:/favorites/{movieId}
     */
    favoritesMovieIdDelete: (movieId: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/favorites/${movieId}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),
  };
  movie = {
    /**
     * No description
     *
     * @tags movies
     * @name MovieGet
     * @summary Получение фильмов по заданным фильтрам
     * @request GET:/movie
     */
    movieGet: (
      query?: {
        /** ограничение количества возвращаемых фильмов (по-умолчанию - 50) */
        count?: number;
        /** показ следующей страницы списка фильмов */
        page?: number;
        /** фильтр по названию фильма */
        title?: string;
        /** фильтр по жанру */
        genre?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Movie[], any>({
        path: `/movie`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags movies
     * @name MovieTop10Get
     * @summary Получение фильмов с наивысшим рейтингом
     * @request GET:/movie/top10
     */
    movieTop10Get: (params: RequestParams = {}) =>
      this.request<Movie[], any>({
        path: `/movie/top10`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags movies
     * @name MovieGenresGet
     * @summary Получение жанров
     * @request GET:/movie/genres
     */
    movieGenresGet: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/movie/genres`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags movies
     * @name MovieIdGet
     * @summary Получение фильма по id
     * @request GET:/movie/{movieId}
     */
    movieIdGet: (movieId: number, params: RequestParams = {}) =>
      this.request<Movie, any>({
        path: `/movie/${movieId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags movies
     * @name MovieRandomGet
     * @summary Получение случайного фильма
     * @request GET:/movie/random
     */
    movieRandomGet: (params: RequestParams = {}) =>
      this.request<Movie, any>({
        path: `/movie/random`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
