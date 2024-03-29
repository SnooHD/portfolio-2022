module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    requireConfigFile: false,
    sourceType: 'module'
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  rules: {
    indent: 0,
    'no-console': 0,
    'arrow-parens': 0,
    'vue/html-indent': 0,
    'vue/html-self-closing': 0,
    'space-before-function-paren': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-v-for-template-key': 0,
    'prefer-promise-reject-errors': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'func-call-spacing': 0,
    'vue/max-attributes-per-line': [
      1,
      {
        singleline: {
          max: 4
        },
        multiline: {
          max: 1
        }
      }
    ]
  }
}
