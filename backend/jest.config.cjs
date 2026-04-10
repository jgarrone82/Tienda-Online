module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.int.test.js'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  setupFiles: ['<rootDir>/tests/setup/env.js'],
  testTimeout: 60000,
};
