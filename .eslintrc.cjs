/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint: recommended',
    // "@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: [2, 'never'],
    quotes: [2, 'single'],
    'max-len': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'vue/html-quotes': ['error', 'double'],
  },
}