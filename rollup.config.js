import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import banner from 'rollup-plugin-banner'

export default {
  input: 'src/index.js',
  output: {
    file: './dist/hub.min.js',
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
    banner('hub.min.js v<%= pkg.version %>')
  ]
}
