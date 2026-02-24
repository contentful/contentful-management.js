import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import alias from '@rollup/plugin-alias'
import pkg from './package.json' with { type: 'json' }
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import sourcemaps from 'rollup-plugin-sourcemaps2'
import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'

const __dirname = dirname(fileURLToPath(import.meta.url))

const baseConfig = {
  input: 'lib/index.ts',
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      noEmitOnError: true,
    }),
    sourcemaps(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __VERSION__: JSON.stringify(pkg.version),
    }),
    json(),
  ],
  external: [/node_modules\/(?!tslib.*)/],
}

const esmConfig = {
  ...baseConfig,
  output: {
    dir: 'dist/esm',
    format: 'esm',
    preserveModules: true,
    sourcemap: true,
    entryFileNames: '[name].mjs',
    chunkFileNames: '[name].mjs',
  },
}

const cjsBundleConfig = {
  ...baseConfig,
  output: {
    file: 'dist/cjs/index.cjs',
    format: 'cjs',
    sourcemap: true,
    interop: 'auto',
  },
}

const typesConfig = {
  ...baseConfig,
  output: {
    dir: 'dist/types',
    format: 'esm',
    preserveModules: true,
    sourcemap: true,
  },
  plugins: [
    ...baseConfig.plugins,
    typescript({
      tsconfig: './tsconfig.json',
      outDir: 'dist/types',
      declaration: true,
      noEmitOnError: true,
      emitDeclarationOnly: true,
    }),
  ],
}

// Browser bundle for direct script inclusion
const scriptConfig = {
  ...baseConfig,
  output: {
    file: 'dist/browser/index.js',
    format: 'iife',
    name: 'contentfulManagement',
    sourcemap: true,
  },
  plugins: [
    ...baseConfig.plugins,
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    alias({
      entries: [
        {
          find: 'axios',
          replacement: resolve(__dirname, './node_modules/axios/dist/browser/axios.cjs'),
        },
        {
          find: 'process',
          replacement: resolve(__dirname, 'node_modules', 'process/browser'),
        },
      ],
    }),
    commonjs({
      sourceMap: true,
      transformMixedEsModules: true,
      ignoreGlobal: true,
      ignoreDynamicRequires: true,
      requireReturnsDefault: 'auto',
    }),
    nodePolyfills({
      include: ['util'],
    }),
  ],
  external: [], // Purposefully bundle all dependencies for browser usage
}

const scriptMinConfig = {
  ...scriptConfig,
  output: {
    ...scriptConfig.output,
    file: 'dist/browser/index.min.js',
  },
  plugins: [
    ...scriptConfig.plugins,
    terser({
      compress: {
        passes: 5,
        ecma: 2023,
        drop_console: true,
        drop_debugger: true,
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        collapse_vars: true,
        reduce_vars: true,
        pure_getters: true,
        pure_new: true,
        keep_classnames: false,
        keep_fnames: false,
        keep_fargs: false,
        keep_infinity: false,
      },
      format: {
        comments: false,
        beautify: false,
      },
    }),
  ],
}

export default [esmConfig, cjsBundleConfig, typesConfig, scriptConfig, scriptMinConfig]
