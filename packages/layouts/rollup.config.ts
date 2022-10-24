import typescript from 'rollup-plugin-typescript2';
import less from 'rollup-plugin-less';
import clear from 'rollup-plugin-clear';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';

export default {
  input: ['./src/index.ts'],
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      name: 'cjs.js',
    },
    {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'umd.js',
    },
    {
      file: 'dist/es/index.js',
      format: 'es',
      name: 'index.js',
    },
  ],
  plugins: [
    typescript(),
    less({ output: './dist/style/index.css' }),
    clear({
      targets: ['dist'],
    }),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    terser(),
    uglify(),
    copy({
      targets: [{ src: './src/autologout/idleWorker.js', dest: 'dist/public' }],
    }),
  ],
  external: ['react', 'react-dom'],
  outputs: {
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
};
