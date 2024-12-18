import typescriptEslint from "@typescript-eslint/eslint-plugin";
import stylisticJs from "@stylistic/eslint-plugin-js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import n from "eslint-plugin-n";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules/*", "**/*.mjs", "**/*.js"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic",
    "plugin:n/recommended-script",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "@stylistic/js": stylisticJs,
        "@stylistic/ts": stylisticTs,
        n,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.json",
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },

    rules: {
        "@typescript-eslint/explicit-member-accessibility": "warn",
        "@typescript-eslint/no-misused-promises": 0,
        "@typescript-eslint/no-floating-promises": 0,
        "@typescript-eslint/no-confusing-void-expression": 0,
        "@typescript-eslint/no-unnecessary-condition": 0,

        "@typescript-eslint/restrict-template-expressions": ["error", {
            allowNumber: true,
        }],

        "@typescript-eslint/restrict-plus-operands": ["warn", {
            allowNumberAndString: true,
        }],

        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-unsafe-enum-comparison": 0,
        "@typescript-eslint/no-unnecessary-type-parameters": 0,
        "@stylistic/js/no-extra-semi": "warn",

        "max-len": ["warn", {
            code: 80,
        }],

        "@stylistic/ts/semi": ["warn", "always"],

        "@stylistic/ts/member-delimiter-style": ["warn", {
            multiline: {
                delimiter: "comma",
                requireLast: true,
            },

            singleline: {
                delimiter: "comma",
                requireLast: false,
            },

            overrides: {
                interface: {
                    singleline: {
                        delimiter: "semi",
                        requireLast: false,
                    },

                    multiline: {
                        delimiter: "semi",
                        requireLast: true,
                    },
                },
            },
        }],

        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-unused-expressions": "warn",
        "comma-dangle": ["warn", "always-multiline"],
        "no-console": 1,
        "no-extra-boolean-cast": 0,
        indent: ["warn", 2],
        quotes: ["warn", "single"],
        "n/no-process-env": 1,
        "n/no-missing-import": 0,
        "n/no-unpublished-import": 0,
        "prefer-const": "warn",
    },
}];