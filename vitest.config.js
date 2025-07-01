import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "**/release.config.cjs",
        "agile/features/steps/**",
        "**/*.steps.js",
        "main.js",
      ],
      reporter: ["text", "json", "lcov"],
      reportsDirectory: "./coverage",
    },
  },
});
