import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/__tests__/*.test.ts'],
    coverage: {
      include: ['app/**/*.ts'],
      exclude: ['**/__tests__/**'],
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
    },
  },
});
