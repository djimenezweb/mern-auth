// Adapted from https://github.com/jujhars13/node-user-agent-parse/

export function parse(str) {
  const agent = {};
  agent.full = str;
  agent.name = browserName(str);
  agent.version = version(str, agent.name);
  agent.fullName = agent.name + ' ' + agent.version;
  agent.os = os(str);
  agent.device_type = getDeviceType(str);
  return agent;
}

function version(str, name) {
  if (name === 'safari') {
    name = 'version';
  }
  if (name) {
    return (
      (new RegExp(name + '[\\/ ]([\\d\\w\\.-]+)', 'i').exec(str) &&
        RegExp.$1) ||
      ''
    );
  } else {
    const m = str.match(/version[\/ ]([\d\w\.]+)/i);
    return m && m.length > 1 ? m[1] : '';
  }
}

/**
 * Supported operating systems.
 */
const operatingSystems = {
  iPad: /ipad/i,
  iPhone: /iphone/i,
  Android: /android/i,
  'Windows 10 or 11': /windows nt 10\.0/i,
  'Windows 7 or 8': /windows nt 6\.\d+/i,
  'Windows Vista': /windows nt 6\.0/i,
  'Windows 2003': /windows nt 5\.2+/i,
  'Windows XP': /windows nt 5\.1+/i,
  'Windows 2000': /windows nt 5\.0+/i,
  'OS X $1.$2': /os x (\d+)[._](\d+)/i,
  Linux: /linux/i,
  Googlebot: /googlebot/i,
};

const osNames = Object.keys(operatingSystems);

function os(str) {
  let captures;
  for (let i = 0, len = osNames.length; i < len; ++i) {
    if ((captures = operatingSystems[osNames[i]].exec(str))) {
      return ~osNames[i].indexOf('$1')
        ? osNames[i].replace(/\$(\d+)/g, function (_, n) {
            return captures[n];
          })
        : osNames[i];
    }
  }
  return '';
}

const names = [
  'edge',
  'opera',
  'konqueror',
  'firefox',
  'chrome',
  'epiphany',
  'safari',
  'msie',
  'curl',
  'maxthon',
];

function browserName(str) {
  str = str.toLowerCase();
  for (let i = 0, len = names.length; i < len; ++i) {
    if (str.indexOf(names[i]) !== -1) {
      return names[i];
    }
  }
  return '';
}

const defaultOptions = {
  emptyUserAgentDeviceType: 'desktop',
  unknownUserAgentDeviceType: 'phone',
  botUserAgentDeviceType: 'bot',
};

const devices = {
  tv: 'tv',
  tablet: 'tablet',
  phone: 'phone',
  desktop: 'desktop',
  bot: 'bot',
};

function getDeviceType(ua) {
  const options = defaultOptions || {};

  if (!ua || ua === '') {
    // No user agent.
    return options.emptyUserAgentDeviceType || devices.desktop;
  }

  if (
    ua.match(
      /GoogleTV|SmartTV|Internet TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i
    )
  ) {
    // if user agent is a smart TV - http://goo.gl/FocDk
    return devices.tv;
  } else if (ua.match(/Xbox|PLAYSTATION 3|Wii/i)) {
    // if user agent is a TV Based Gaming Console
    return devices.tv;
  } else if (
    ua.match(/iP(a|ro)d/i) ||
    (ua.match(/tablet/i) && !ua.match(/RX-34/i)) ||
    ua.match(/FOLIO/i)
  ) {
    // if user agent is a Tablet
    return devices.tablet;
  } else if (
    ua.match(/Linux/i) &&
    ua.match(/Android/i) &&
    !ua.match(/Fennec|mobi|HTC Magic|HTCX06HT|Nexus One|SC-02B|fone 945/i)
  ) {
    // if user agent is an Android Tablet
    return devices.tablet;
  } else if (
    ua.match(/Kindle/i) ||
    (ua.match(/Mac OS/i) && ua.match(/Silk/i))
  ) {
    // if user agent is a Kindle or Kindle Fire
    return devices.tablet;
  } else if (
    ua.match(
      /GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC( Flyer|_Flyer)|Sprint ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos S7|Dell Streak 7|Advent Vega|A101IT|A70BHT|MID7015|Next2|nook/i
    ) ||
    (ua.match(/MB511/i) && ua.match(/RUTEM/i))
  ) {
    // if user agent is a pre Android 3.0 Tablet
    return devices.tablet;
  } else if (
    ua.match(
      /BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google Wireless Transcoder/i
    )
  ) {
    // if user agent is unique mobile User Agent
    return devices.phone;
  } else if (
    ua.match(/Opera/i) &&
    ua.match(/Windows NT 5/i) &&
    ua.match(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i)
  ) {
    // if user agent is an odd Opera User Agent - http://goo.gl/nK90K
    return devices.phone;
  } else if (
    (ua.match(/Windows (NT|XP|ME|9)/) &&
      !ua.match(/Phone/i) &&
      !ua.match(/Bot|Spider|ia_archiver|NewsGator/i)) ||
    ua.match(/Win( ?9|NT)/i)
  ) {
    // if user agent is Windows Desktop
    return devices.desktop;
  } else if (ua.match(/Macintosh|PowerPC/i) && !ua.match(/Silk/i)) {
    // if agent is Mac Desktop
    return devices.desktop;
  } else if (
    ua.match(/Linux/i) &&
    ua.match(/X11/i) &&
    !ua.match(/Charlotte/i)
  ) {
    // if user agent is a Linux Desktop
    return devices.desktop;
  } else if (ua.match(/CrOS/)) {
    // if user agent is a Chrome Book
    return devices.desktop;
  } else if (ua.match(/Solaris|SunOS|BSD/i)) {
    // if user agent is a Solaris, SunOS, BSD Desktop
    return devices.desktop;
  } else if (
    ua.match(
      /curl|Bot|B-O-T|Crawler|Spider|Spyder|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|Charlotte|NewsGator|TinEye|Cerberian|SearchSight|Zao|Scrubby|Qseero|PycURL|Pompos|oegp|SBIder|yoogliFetchAgent|yacy|webcollage|VYU2|voyager|updated|truwoGPS|StackRambler|Sqworm|silk|semanticdiscovery|ScoutJet|Nymesis|NetResearchServer|MVAClient|mogimogi|Mnogosearch|Arachmo|Accoona|holmes|htdig|ichiro|webis|LinkWalker|lwp-trivial/i
    ) &&
    !ua.match(/mobile|Playstation/i)
  ) {
    // if user agent is a BOT/Crawler/Spider
    return options.botUserAgentDeviceType || devices.bot;
  } else {
    // Otherwise assume it is a mobile Device
    return options.unknownUserAgentDeviceType || devices.phone;
  }
}
