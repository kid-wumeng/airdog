module.exports = {
  entry: [
    `babel-polyfill`,
    `${__dirname}/core.js`
  ],
  output: {
    path: `${CWD}/build`,
    name: 'bundle.js'
  },
  resolveLoader: {
    root: `${CWD}/node_modules`
  },
  resolve: {
    alias: {
      BEO: BEO,
      CWD: CWD,
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015-without-strict'],
        plugins: [
          //  @REVIEW .default
          'transform-decorators-legacy',
          'add-module-exports',
          'transform-async-to-generator',
          'transform-class-properties',
          'transform-object-rest-spread',
        ],
      }
    }]
  }
}