import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      include: ['test/unit/**/*.{test,spec}.ts'],
      name: 'unit',
      environment: 'node',
      maxConcurrency: 10,
    },
  },
  {
    test: {
      include: ['test/integration/**/*.{test,spec}.ts'],
      name: 'integration',
      environment: 'node',
      maxConcurrency: 1,
      testTimeout: 15000,
      hookTimeout: 15000,
    },
    teardownTimeout: 30000,
    slowTestThreshold: 1000,
  },
  {
    test: {
      include: ['test/unit/**/*.{test,spec}.ts'],
      name: 'browser-unit',
      maxConcurrency: 10,
      browser: {
        enabled: true,
        provider: 'playwright',
        name: 'chromium',
      },
    },
  },
  {
    test: {
      include: ['test/integration/**/*.{test,spec}.ts'],
      name: 'browser-integration',
      browser: {
        enabled: true,
        provider: 'playwright',
        name: 'chromium',
      },
      maxConcurrency: 1,
      testTimeout: 15000,
      hookTimeout: 15000,
    },
    teardownTimeout: 30000,
    slowTestThreshold: 1000,
  },
])
