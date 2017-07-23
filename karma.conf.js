const path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['test/**/*test.js'],
    reporters: ['progress'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    singleRun: true, // if true, Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
    preprocessors: {
      // add webpack as preprocessor
      'test/unit/**/*.test.js': ['webpack']
    },

    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            include: [
                path.join(__dirname, 'src'),
                path.join(__dirname, 'test')
            ],
        }]
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e. 
        chunks: false
      }
    },

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chai"),
      require("karma-chrome-launcher")
    ]
  });
}