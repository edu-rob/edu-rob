import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  next.configs["core-web-vitals"],
  next.configs.typescript,
  {
    rules: {
      "no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
