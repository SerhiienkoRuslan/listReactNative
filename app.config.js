export default ({ ...config }) => ({
  ...config,
  name: 'listReactNative',
  slug: 'listReactNative',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  primaryColor: '#ff5dc8',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#003f5c'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'guide.graphql.guide',
    buildNumber: '1.0.0',
    supportsTablet: true,
    icon: './assets/icon-ios.png'
  },
  android: {
    package: 'guide.graphql.guide',
    versionCode: 1,
    permissions: []
  },
  web: {
    favicon: './assets/favicon.png'
  }
});
