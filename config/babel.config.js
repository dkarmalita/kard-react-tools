module.exports = (resolve) => ({
  "presets": [
    [resolve("@babel/preset-env"),
      {
        "loose": true
      }
    ],
    resolve("@babel/preset-react")
  ],
  "plugins": [
    [resolve("@babel/plugin-proposal-decorators"), { "legacy": true }],
    [resolve("@babel/plugin-proposal-class-properties"), { "loose": true }],
    resolve("@babel/plugin-proposal-object-rest-spread")
  ],
  "env": {
    "test": {
      "plugins": [
        resolve("@babel/plugin-transform-modules-commonjs")
      ]
    }
  }
})
