import {
  accessTokenExpiration,
  refreshTokenExpiration,
} from './expireOptions.js';

const cookiesOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
};

const accessTokenCookiesOptions = {
  ...cookiesOptions,
};

const refreshTokenCookiesOptions = {
  ...cookiesOptions,
  maxAge: refreshTokenExpiration * 1000,
};

export {
  cookiesOptions,
  accessTokenCookiesOptions,
  refreshTokenCookiesOptions,
};
