module.exports = {
  locales: ['fr', 'en'],
  output: 'src/internationalization/locales/$LOCALE.json',
  input: [
    'app/**/*.{js,jsx,ts,tsx}',
    'src/**/*.{js,jsx,ts,tsx}',
],

  createOldCatalogs: false,
  keepRemoved: true,
  addKeysAsDefaultValue: true,
  defaultValue: '',
  keySeparator: false,
  namespaceSeparator: false,
  verbose: true
}