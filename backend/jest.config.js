module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.int.test.js'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/tests/setup/db.js'],
  testTimeout: 60000,
};
