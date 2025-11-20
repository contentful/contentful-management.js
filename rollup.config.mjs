import pkg from './package.json' with { type: 'json' }
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import sourcemaps from 'rollup-plugin-sourcemaps2'

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
    commonjs({
      sourceMap: true,
      transformMixedEsModules: true,
      ignoreGlobal: true,
      ignoreDynamicRequires: true,
      requireReturnsDefault: 'auto',
    }),
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
    file: 'dist/csj/index.cjs',
    format: 'cjs',
    sourcemap: true,
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

export default [esmConfig, cjsBundleConfig, typesConfig]
