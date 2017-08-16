module.exports = wallaby => ({
  files: [
    {pattern: 'node_modules/react/dist/react-with-addons.js',
      instrument: false},
    'src/**',
  ],
  tests: [
    'tests/specs/**/*spec.js',
  ],

  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'mocha',

  compilers: {
    '**/*.js*': wallaby.compilers.babel(),
  },

  preprocessors: {
    'src/assets/**/*.*': _ => '{}',
  },
});
