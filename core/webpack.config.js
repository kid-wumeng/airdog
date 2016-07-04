export default {
  entry: [
    // `${AIRDOG_DIR}/node_modules/babel-polyfill`,
    `${AIRDOG_DIR}/core/runtime.client`
  ],
  output: {
    path: `${RUNTIME_DIR}/build`,
    name: 'bundle.js'
  },
  resolveLoader: {
    root: `${AIRDOG_DIR}/node_modules`
  },
  resolve: {
    alias: {
      AIRDOG_DIR:  AIRDOG_DIR,
      RUNTIME_DIR: RUNTIME_DIR,
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015-without-strict'],
        plugins: [
          //  @REVIEW .default
          'transform-decorators-legacy',
          'add-module-exports',
          'transform-async-to-generator',
          'transform-class-properties',
        ],
      }
    }]
  }
}