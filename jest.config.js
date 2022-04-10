const config = {
  verbose: true,
  preset: 'react-native',
  clearMocks: true,
  collectCoverage: true,
  setupFilesAfterEnv: ['./setupTest.js'],
  snapshotSerializers: ['./node_modules/enzyme-to-json/serializer'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};

module.exports = config;
