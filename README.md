# Parcel 2 Library Template

This repository uses certain conventions that allow maintaining a TypeScript library using the existing features of Parcel 2.

The main convention is that the "intended" entry point of the published library is `./src/index.ts`. However, all the entry points for Parcel 2 are in `src/targets`, as follows:

| Command              | Entry Files                  | Modifications                    | Parcel Target Name | Build File                 |
| -------------------- | ---------------------------- | -------------------------------- | ------------------ | -------------------------- |
| `make build-main`    | `src/targets/main.ts`        | None                             | `main`             | `dist/template.main.js`    |
| `make build-module`  | `src/targets/module.ts`      | None                             | `module`           | `dist/template.module.js`  |
| `make build-types`   | `src/targets/types.ts`       | None                             | `types`            | `dist/template.d.ts`       |
| `make build-browser` | `src/targets/browser.ts`     | Export libraries on `globalThis` | `browser`          | `dist/template.browser.ts` |
| `make build`         |                              |                                  |                    | Builds all targets above   |
| `make dev`           | `src/targets/dev/index.html` | Testing code                     | N/A                | (opens browser))           |

Note: `main` should be called `node`, but the `package.json` field is called `main` and we use `main` for consistency.

## Usage

1. Copy `src/targets` (and update `dev.ts` to taste).
2. `package.json`
   - Copy the `scripts` and `targets` fields .
   - Copy and rename the the target files in `package.json` (fields: `main`, `module`, `types`, `browser`).
   - `npm install parcel@nightly`
3. Rename the exported library name in [`./src/targets/browser.ts`](./src/targets/browser.ts).
