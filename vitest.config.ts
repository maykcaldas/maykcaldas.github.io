import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    // Keep Node 25's experimental storage out of the browser-like test environment.
    execArgv: ['--no-experimental-webstorage'],
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    restoreMocks: true,
  },
});
