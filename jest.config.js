module.exports = {
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/test/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: ['<rootDir>/test/src']
}