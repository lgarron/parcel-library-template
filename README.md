# Parcel 2 Library Template

This repository uses certain conventions that allow maintaining a TypeScript library using the existing features of Parcel 2.

The main convention is that the "intended" entry point of the published library is `./src/index.ts`. However, the entry points for any Parcel 2 targets are all in `src/targets`, as follows:

| Command                     | Entry File                        | Build File                        |
| --------------------------- | --------------------------------- | --------------------------------- |
| `make build-main` ¹         | `src/targets/main.ts` ²           | `dist/template.main.js`           |
| `make build-module`         | `src/targets/module.ts` ²         | `dist/template.module.js`         |
| `make build-types`          | `src/targets/types.ts` ²          | `dist/template.d.ts`              |
| `make build-browser-global` | `src/targets/browser-global.ts` ³ | `dist/template.browser-global.ts` |
| `make build`                | (Multiple)                        | Builds all targets above          |
| `make dev`                  | `src/targets/dev/index.html`      | (opens browser)                   |

¹ `main` should be called `node`, but the `package.json` field is called `main`. So we use `main` for consistency.  
² Ideally, we would use `./src/index.ts` directly. But it seems that Parcel 2 caches the target file for a given entry file, so we use separate entry files that re-export the `src/index.ts` exports.  
³ This should simply import the library code and export it as an object on [`globalThis`](https://caniuse.com/#feat=mdn-javascript_builtins_globalthis).

## Usage

1. Copy `src/targets` (and update `src/targets/dev/dev.ts` to taste).
2. `package.json`
   - Review and copy the `scripts` and `targets` fields.
   - Copy and rename the the target files in `package.json` (fields: `main`, `module`, `types`, `browser-global`).
   - `npm install --save-dev parcel@nightly typescript`
3. Rename the exported library name in [`./src/targets/browser-global.ts`](./src/targets/browser-global.ts).

# Other config files.

## `.babelrc`

Depending on what features you use, you may need to create a `.babelrc` file:

    {
      "presets": [
        "@babel/preset-typescript"
      ],
      "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-private-methods",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator"
      ]
    }

You'll also have to run `npm install --save-dev` for each of the packages in those lists.

## `.parcelrc`

You'll need a Parcel 2 config file (`.parcelrc`) to e.g. use transformers:

    {
      "extends": "@parcel/config-default",
      "transformers": {
        "*.pegjs": ["parcel-transformer-pegjs"]
      }
    }

## `tsconfig.json`

Depending on what features you use, you may need to create a `tsconfig.json` file, e.g.:

    {
      "compilerOptions": {
        "target": "es2015"
      }
    }

You may have to be careful with options that affect input/output files/folders.
