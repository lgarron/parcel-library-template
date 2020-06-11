# Parcel 2 Library Template

This repository uses certain conventions that allow maintaining a TypeScript library using the existing features of Parcel 2.

The main convention is that the "intended" entry point of the published library is `./src/index.ts`. However, all the entry points for Parcel 2 are in `src/targets`, as follows:

| Command              | Entry Files                  | Modifications                    | Parcel Target Name | Build File                 |
| -------------------- | ---------------------------- | -------------------------------- | ------------------ | -------------------------- |
| `make build-main`    | `src/targets/main.ts` ¹      | None                             | `main` ²           | `dist/template.main.js`    |
| `make build-module`  | `src/targets/module.ts` ¹    | None                             | `module`           | `dist/template.module.js`  |
| `make build-types`   | `src/targets/types.ts` ¹     | None                             | `types`            | `dist/template.d.ts`       |
| `make build-browser` | `src/targets/browser.ts`     | Export libraries on `globalThis` | `browser`          | `dist/template.browser.ts` |
| `make build`         |                              |                                  |                    | Builds all targets above   |
| `make dev`           | `src/targets/dev/index.html` | Testing code                     | N/A                | (opens browser))           |

¹ Except in special situations, these files should just re-export `*` from `src/index.ts`.
² `main` should be called `node`, but the `package.json` field is called `main` and we use `main` for consistency.

## Usage

1. Copy `src/targets` (and update `dev.ts` to taste).
2. `package.json`
   - Copy the `scripts` and `targets` fields .
   - Copy and rename the the target files in `package.json` (fields: `main`, `module`, `types`, `browser`).
   - `npm install --save-dev parcel@nightly typescript`
3. Rename the exported library name in [`./src/targets/browser.ts`](./src/targets/browser.ts).

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
