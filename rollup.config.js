// rollup.config.js (building more than one bundle)
export default [{
    input: 'index.js',
    output: {
      file: 'dist/libz.js',
      format: 'es',
      name: "libz"
    }
  }];