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
  maxAge: accessTokenExpiration * 1000,
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
