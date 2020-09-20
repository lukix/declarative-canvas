module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.(js|ts)?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)?$',
  moduleFileExtensions: ['ts', 'js', 'json'],
};
