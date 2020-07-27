import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import banner from 'rollup-plugin-banner'

export default {
  input: 'src/index.js',
  output: {
    file: './dist/flowhub.min.js',
    format: 'umd',
    name: '$hub',
    sourcemap: true
  },
  plugins: [
    getBabelOutputPlugin({
      allowAllFormats: true,
      presets: [
        ['@babel/preset-env', { modules: 'umd' }]
      ]
    }),
    uglify(),
    banner('flowhub.min.js v<%= pkg.version %>')
  ]
}
