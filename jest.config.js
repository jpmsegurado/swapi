module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/views/**/*.vue',
    '<rootDir>/src/components/**/*.vue'
  ]

}
