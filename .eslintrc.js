module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['promise'],
  globals: {
    __VERSION__: true,
  },
}
