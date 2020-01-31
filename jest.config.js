module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  setupFiles: [
    '<rootDir>/jest/global.js'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/views/**/*.vue',
    '<rootDir>/src/components/**/*.vue'
  ]

}
