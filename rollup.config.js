// rollup.config.js (building more than one bundle)
import typescript from 'rollup-plugin-typescript';

export default [{
    input: 'src/main.ts',
    output: {
      file: 'dist/libz.js',
      format: 'es',
      name: "libz"
    },
    plugins: [
      typescript({lib: ["es5", "es6", "dom"], target: "es5", experimentalDecorators: true})
    ]
  }];