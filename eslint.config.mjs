import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { configs } from "eslint-plugin-react";
import { fixupConfigRules } from "@eslint/compat";
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            configs,
        },

        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            semi: "error",
            // ... any rules you want
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
        },

        languageOptions: { globals: globals.browser, },
    },

    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...fixupConfigRules(pluginReactConfig),
];
