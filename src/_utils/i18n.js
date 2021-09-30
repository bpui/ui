export function i18n(key, defaultWord) {
  let i18 = window['$i18n'];
  return i18(key, defaultWord);
}