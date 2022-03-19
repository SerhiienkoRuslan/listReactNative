module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          // Use React 17 automatic JSX runtime.
          jsxRuntime: 'automatic'
        }
      ]
    ],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env'
        }
      ],
      '@babel/plugin-proposal-optional-chaining',
      'transform-inline-environment-variables',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: './src/components',
            screens: './src/screens',
            styles: './src/styles',
            constants: './src/constants',
            navigation: './src/navigation',
            helpers: './src/helpers',
            graphqlVar: './src/graphqlVar',
            context: './src/context'
          }
        }
      ]
    ]
  };
};
