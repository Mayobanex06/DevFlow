import theConfig from "@marcrock22/eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
  theConfig,
  {
    ignores: ["prisma/**", "dist/**", "node_modules/**"],
  },
  {
    rules: {
      "@typescript-eslint/class-methods-use-this": [
        "error",
        {
          ignoreOverrideMethods: true,
        },
      ],
    },
  },
)``;
