const MIN = 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;

const accessTokenExpiration = DAY;
const refreshTokenExpiration = WEEK;

export { accessTokenExpiration, refreshTokenExpiration };
