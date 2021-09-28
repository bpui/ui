export function i18n(key, defaultWord) {
  let r = window['$i18n'];
  if (r && !r.__de) {
    return r(key);
  }
  else {
    return defaultWord;
  }
}