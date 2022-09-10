const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

const oldestSupportedReactVersion = '16.5.2';

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 11, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  parser: 'babel-eslint',
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    'prettier/prettier': ['error', prettierOptions],
    'react/boolean-prop-naming': 'off',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': ['error', { ignoreTranspilerName: false }],
    'react/forbid-component-props': 'off',
    'react/forbid-dom-props': 'off',
    'react/forbid-elements': 'off',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'ignore' }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/jsx-fragments': 'off',
    'react/jsx-handler-names': 'off',
    'react/jsx-max-depth': 'off',
    'react/jsx-newline': 'off',
    'react/jsx-no-bind': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-default-props': 'off',
    'react/jsx-sort-props': 'off',
    'react/no-adjacent-inline-elements': 'off',
    'react/no-array-index-key': 'off', // sometimes you don't care about the issues or they don't apply
    'react/no-children-prop': 'off',
    'react/no-danger': 'off',
    'react/no-multi-comp': 'off',
    'react/no-set-state': 'off',
    'react/no-unescaped-entities': 'warn',
    'react/no-unsafe': 'warn', // if you need it there should be a comment explaining why
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/prefer-es6-class': 'off',
    'react/prefer-read-only-props': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off', // sometimes the default value is undefined so that's fine...
    'react/require-optimization': 'off',
    'react/sort-comp': 'off',
    'react/sort-prop-types': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react-hooks/exhaustive-deps': 'warn',

    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'no-shadow': 'off',
    eqeqeq: 'warn',
    'no-useless-escape': 'warn',
    'prefer-const': 'warn',
    'no-param-reassign': 'off',
    'default-case': 'off',
    'no-return-assign': 'warn',
    'guard-for-in': 'warn',
    'no-restricted-syntax': 'warn',
    'class-methods-use-this': 'warn',
    'no-plusplus': 'warn',
    'no-use-before-define': 'off', // conflict with React
    'no-nested-ternary': 'warn',
    'consistent-return': 'off',
    'no-return-await': 'warn',
    'no-prototype-builtins': 'warn',

    'jsx-a11y/label-has-associated-control': [
      'warn',
      {
        labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
    'jsx-a11y/label-has-for': [
      'warn',
      {
        components: ['Label'],
        required: {
          every: ['id'],
        },
        allowChildren: false,
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': ['warn'],
    'jsx-a11y/no-static-element-interactions': ['warn'],
    'jsx-a11y/no-redundant-roles': ['warn'],
    'jsx-a11y/click-events-have-key-events': ['warn'],
    'jsx-a11y/anchor-is-valid': ['warn'],
    'jsx-a11y/control-has-associated-label': ['warn'],
    'jsx-a11y/no-autofocus': ['warn'],

    'import/no-cycle': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/prefer-default-export': 'off',
    'import/no-named-as-default': 'warn',
    'import/extensions': 'warn',
  },
  settings: {
    react: {
      version: oldestSupportedReactVersion, // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      alias: {
        map: [
          ['@container', path.resolve(__dirname, 'src/client/components/container/')],
          ['@general', path.resolve(__dirname, 'src/client/components/general/')],
          ['@view', path.resolve(__dirname, 'src/client/components/view/')],
          ['@layout', path.resolve(__dirname, 'src/client/layout/')],
          ['@store', path.resolve(__dirname, 'src/client/store/')],
          ['@utils', path.resolve(__dirname, 'src/client/utils/')],
          ['@hook', path.resolve(__dirname, 'src/client/hook/')],
          ['@scss', path.resolve(__dirname, 'src/client/assets/scss/')],
        ],
        extensions: ['.js', '.jsx', '.json', '.scss'],
      },
    },
  },
  globals: { IS_SERVER: false, IS_CLIENT: true, __VERSION__: 'readonly' },
};
