import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import babelParser from '@babel/eslint-parser';

export default [
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        languageOptions: {
            globals: globals.browser,
            parser: babelParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                },
                requireConfigFile: false,
                babelOptions: {
                    plugins: ['@babel/plugin-syntax-jsx']
                }
            }
        },
        plugins: {
            react: pluginReact,
            prettier: pluginPrettier,
            'jsx-a11y': pluginJsxA11y,
            'react-hooks': pluginReactHooks
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...pluginReact.configs.recommended.rules,
            ...pluginPrettier.configs.recommended.rules,
            ...pluginJsxA11y.configs.recommended.rules,
            ...pluginReactHooks.configs.recommended.rules,
            'react/prop-types': 'off',
            yoda: ['error', 'always'],
            'prettier/prettier': [
                'error',
                {
                    tabWidth: 4
                }
            ],
            'react/react-in-jsx-scope': 'off',
            'jsx-a11y/alt-text': 2,
            'no-unused-vars': 'warn',
            'no-console': 'warn',
            eqeqeq: ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'error',
            curly: 'error',
            'react/no-array-index-key': 'warn',
            'react/jsx-key': 'warn',
            'react/jsx-no-target-blank': 'error',

            // React hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // JSX Accessibility rules
            'jsx-a11y/anchor-has-content': 2,
            'jsx-a11y/anchor-is-valid': [
                2,
                {
                    aspects: ['noHref', 'invalidHref', 'preferButton']
                }
            ],
            'jsx-a11y/aria-props': 2,
            'jsx-a11y/aria-role': 2,
            'jsx-a11y/aria-unsupported-elements': 2,
            'jsx-a11y/click-events-have-key-events': 2,
            'jsx-a11y/heading-has-content': 2,
            'jsx-a11y/html-has-lang': 2,
            'jsx-a11y/iframe-has-title': 2,
            'jsx-a11y/img-redundant-alt': 2,
            'jsx-a11y/interactive-supports-focus': 2,
            'jsx-a11y/label-has-associated-control': 2,
            'jsx-a11y/lang': 2,
            'jsx-a11y/media-has-caption': 2,
            'jsx-a11y/mouse-events-have-key-events': 2,
            'jsx-a11y/no-access-key': 2,
            'jsx-a11y/no-autofocus': 'off',
            'jsx-a11y/no-distracting-elements': 2,
            'jsx-a11y/no-interactive-element-to-noninteractive-role': [
                2,
                {
                    tr: ['none', 'presentation']
                }
            ],
            'jsx-a11y/no-noninteractive-element-interactions': [
                2,
                {
                    handlers: [
                        'onClick',
                        'onMouseUp',
                        'onMouseDown',
                        'onKeyPress',
                        'onKeyDown',
                        'onKeyUp'
                    ]
                }
            ],
            'jsx-a11y/no-noninteractive-element-to-interactive-role': [
                2,
                {
                    ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid']
                }
            ],
            'jsx-a11y/no-noninteractive-tabindex': 2,
            'jsx-a11y/no-redundant-roles': 2,
            'jsx-a11y/role-has-required-aria-props': 2,
            'jsx-a11y/role-supports-aria-props': 2,
            'jsx-a11y/scope': 2,
            'jsx-a11y/tabindex-no-positive': 2
        }
    }
];
