// import { resolve, dirname } from 'path'
// import { dirname } from 'path'
// import { fileURLToPath } from 'url'

import pkg from './package.json' with { type: 'json' }

import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
// import alias from '@rollup/plugin-alias'
// import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace'
// import { visualizer } from 'rollup-plugin-visualizer'
// import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import sourcemaps from 'rollup-plugin-sourcemaps2'

// const __dirname = dirname(fileURLToPath(import.meta.url))

const tsPlugin = typescript({
  tsconfig: './tsconfig.json',
  declaration: false,
  noEmitOnError: true,
})

const baseConfig = {
  input: 'lib/index.ts',
  plugins: [
    tsPlugin,
    sourcemaps(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __VERSION__: JSON.stringify(pkg.version),
    }),
    commonjs({
      sourceMap: true,
      transformMixedEsModules: true,
      ignoreGlobal: true,
      ignoreDynamicRequires: true,
      requireReturnsDefault: 'auto',
    }),
    json(),
  ],
  external: [/node_modules\/(?!tslib.*)/],
}

const esmConfig = {
  input: 'lib/index.ts',
  output: {
    dir: 'dist/esm',
    format: 'esm',
    preserveModules: true,
    sourcemap: true,
  },
  plugins: [
    tsPlugin,
    sourcemaps(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __VERSION__: JSON.stringify(pkg.version),
    }),
  ],
  external: [/node_modules\/(?!tslib.*)/],
}

const cjsBundleConfig = {
  ...baseConfig,
  external: [],
  output: {
    file: 'dist/contentful-management.bundle.node.cjs',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    ...baseConfig.plugins,
    nodeResolve({
      preferBuiltins: true,
      browser: false,
    }),
    // babel({
    //   babelHelpers: 'bundled',
    //   presets: [
    //     [
    //       '@babel/preset-env',
    //       // Please note: This is set to Node.js v8 in order to satisfy ECMA2017 requirements
    //       // However, we cannot ensure it will operate without issues on Node.js v8
    //       { targets: { node: 8 }, modules: false, bugfixes: true },
    //     ],
    //   ],
    // }),
    // alias({
    //   entries: [
    //     {
    //       find: 'axios',
    //       replacement: resolve(__dirname, './node_modules/axios/dist/node/axios.cjs'),
    //     },
    //   ],
    // }),
  ],
}

// const browserConfig = {
//   ...baseConfig,
//   external: [],
//   output: {
//     file: 'dist/contentful-management.bundle.browser.js',
//     format: 'iife',
//     name: 'contentfulManagement',
//     sourcemap: true,
//   },
//   plugins: [
//     nodeResolve({
//       preferBuiltins: false,
//       browser: true,
//     }),
//     tsPlugin,
//     sourcemaps(),
//     alias({
//       entries: [
//         {
//           find: 'axios',
//           replacement: resolve(__dirname, './node_modules/axios/dist/browser/axios.cjs'),
//         },
//         {
//           find: 'process',
//           replacement: resolve(__dirname, 'node_modules', 'process/browser'),
//         },
//       ],
//     }),
//     ...baseConfig.plugins,
//     babel({
//       babelHelpers: 'runtime',
//       presets: [
//         [
//           '@babel/preset-env',
//           {
//             targets: pkg.browserslist,
//             modules: false,
//             bugfixes: true,
//           },
//         ],
//       ],
//       plugins: [
//         [
//           '@babel/plugin-transform-runtime',
//           {
//             regenerator: true,
//           },
//         ],
//       ],
//     }),
//   ],
// }

// const browserMinConfig = {
//   ...browserConfig,
//   output: {
//     ...browserConfig.output,
//     file: 'dist/contentful-management.bundle.browser.min.js',
//   },
//   plugins: [
//     ...browserConfig.plugins,
//     terser({
//       compress: {
//         passes: 5,
//         ecma: 2018,
//         drop_console: true,
//         drop_debugger: true,
//         sequences: true,
//         booleans: true,
//         loops: true,
//         unused: true,
//         evaluate: true,
//         if_return: true,
//         join_vars: true,
//         collapse_vars: true,
//         reduce_vars: true,
//         pure_getters: true,
//         pure_new: true,
//         keep_classnames: false,
//         keep_fnames: false,
//         keep_fargs: false,
//         keep_infinity: false,
//       },
//       format: {
//         comments: false,
//         beautify: false,
//       },
//     }),
//     visualizer({
//       emitFile: true,
//       filename: 'stats-browser-min.html',
//     }),
//   ],
// }

// Types build in Rollup
const typesConfig = {
  input: 'lib/index.ts',
  output: {
    dir: 'dist/types',
    format: 'esm',
    preserveModules: true,
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      outDir: 'dist/types',
      declaration: true,
      noEmitOnError: true,
      emitDeclarationOnly: true,
    }),
  ],
  external: baseConfig.external,
}

export default [esmConfig, cjsBundleConfig, typesConfig]
// export default [esmConfig, cjsBundleConfig, browserConfig, browserMinConfig, typesConfig]
