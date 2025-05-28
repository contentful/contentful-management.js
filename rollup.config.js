import { resolve, extname, dirname } from 'path';
import { fileURLToPath } from 'url'

import pkg from './package.json' with { type: 'json' }

import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace'
import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin'
import { visualizer } from 'rollup-plugin-visualizer'
import { babel } from '@rollup/plugin-babel'

const __dirname = dirname(fileURLToPath(import.meta.url))

function renameJsToCjs() {
  return {
    name: 'rename-js-to-cjs',
    generateBundle(options, bundle) {
      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type === 'chunk' && extname(fileName) === '.js') {
          const newFileName = fileName.replace(/\.js$/, '.cjs');

          // Emit new file with updated name and same code
          this.emitFile({ type: 'asset', fileName: newFileName, source: file.code });

          // Remove old .js entry
          delete bundle[fileName];
        }
      }
    },
  };
}

const baseConfig = {
  input: 'dist/esm-raw/index.js',
  output: {
    file: 'dist/contentful-management.cjs',
    format: 'cjs',
  },
  plugins: [
    optimizeLodashImports(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __VERSION__: JSON.stringify(pkg.version),
    }),
    commonjs({
      sourceMap: false,
      transformMixedEsModules: true,
      ignoreGlobal: true,
      ignoreDynamicRequires: true,
      requireReturnsDefault: 'auto',
    }),
    json(),
  ],
}

const esmConfig = {
  input: 'dist/esm-raw/index.js',
  output: {
    dir: 'dist/esm',
    format: 'esm',
    preserveModules: true,
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __VERSION__: JSON.stringify(pkg.version),
    }),
  ],
}

const cjsConfig = {
  input: 'dist/esm-raw/index.js',
  output: {
    dir: 'dist/cjs',
    format: 'cjs',
    preserveModules: true,
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __VERSION__: JSON.stringify(pkg.version),
    }),
    renameJsToCjs()
  ],
}

const cjsBundleConfig = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
  },
  plugins: [
    ...baseConfig.plugins,
    nodeResolve({
      preferBuiltins: true,
      browser: false,
    }),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          // Please note: This is set to Node.js v8 in order to satisfy ECMA2017 requirements
          // However, we cannot ensure it will operate without issues on Node.js v8
          { targets: { node: 8 }, modules: false, bugfixes: true },
        ],
      ],
    }),
    alias({
      entries: [
        {
          find: 'axios',
          replacement: resolve(__dirname, './node_modules/axios/dist/node/axios.cjs'),
        },
      ],
    }),
  ],
}

const browserConfig = {
  ...baseConfig,
  output: {
    file: 'dist/contentful-management.browser.js',
    format: 'iife',
    name: 'contentfulManagement',
  },
  plugins: [
    nodeResolve({
      preferBuiltins: false,
      browser: true,
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
    ...baseConfig.plugins,
    babel({
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: pkg.browserslist,
            modules: false,
            bugfixes: true,
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            regenerator: true,
          },
        ],
      ],
    }),
  ],
}

const browserMinConfig = {
  ...browserConfig,
  output: {
    ...browserConfig.output,
    file: 'dist/contentful-management.browser.min.js',
  },
  plugins: [
    ...browserConfig.plugins,
    terser({
      compress: {
        passes: 5,
        ecma: 2018,
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
    visualizer({
      emitFile: true,
      filename: 'stats-browser-min.html',
    }),
  ],
}

export default [esmConfig, cjsConfig, cjsBundleConfig, browserConfig, browserMinConfig]
