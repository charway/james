module.exports = {
    root: true,
    plugins: ['prettier'],
    extends: ['@react-native-community'],
    rules: {
        'prettier/prettier': 'error',
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: ['error', 'never'],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'comma-dangle': ['error', 'never'],
        'react-native/no-inline-styles': 0
    }
}
