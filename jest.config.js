module.exports = {
    "roots": [
      "<rootDir>"
    ],
    "collectCoverage": true,
    "collectCoverageFrom": [
      "<rootDir>/src/pages/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/router/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/shark/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/App.tsx"
    ],
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "build/"
    ],
    "coverageReporters": [
      "json-summary",
      "lcov",
      "text",
      "html"
    ],
    "reporters": [
      "default",
    ],
    "setupFiles": [
      "react-app-polyfill/jsdom"
    ],
    "setupFilesAfterEnv": [
      "<rootDir>/src/setupTests.ts"
    ],
    "testMatch": [
      "<rootDir>/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    "modulePaths": [],
    "moduleNameMapper": {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ],
    "watchPlugins": [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ]
  }
  