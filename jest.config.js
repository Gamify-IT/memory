module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["^.+//.css$"],
  setupFiles: ['jest-media-mock'],
};
