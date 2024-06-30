import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    vue: true,
    ignores: ['.gitignore', '**/package.json', 'bin/*', 'src/assets/scripts/**/*', 'md-cli/**/*'],
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
  },
  {
    files: ['**/*.js', '**/*.vue'],
    rules: {
      'unused-imports/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'regexp/no-unused-capturing-group': 'off',
      'no-console': 'off',
      'vue/no-template-shadow': 'off',
      'vue/custom-event-name-casing': 'off',
    },
  },
)
