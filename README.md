# Parcel 2 Library Template

This repository uses certain conventions that allow maintaining a TypeScript library using the existing features of Parcel 2.

The main convention is that the "intended" entry point of the published library is `./src/index.ts`. However, all the entry points for Parcel 2 are in `src/targets`, as follows:

| Command        | Entry Files                  | Modifications                    | Build                     |
| -------------- | ---------------------------- | -------------------------------- | ------------------------- |
| `make module`  | `src/targets/module.ts`      | None                             | `dist/template.module.js` |
| `make types`   | `src/targets/types.ts`       | None                             | `dist/template.d.ts`      |
| `make browser` | `src/targets/browser.ts`     | Export libraries on `globalThis` | `dist/template.browser.ts`  |
| `make dev`     | `src/targets/dev/index.html` | Testing code                     | (opens browser))          |

## Usage

1. Copy `src/targets` (and update `dev.ts` to taste).
2. `package.json`
  - Copy the `scripts` and `targets` fields .
  - Copy and rename the the target files in `package.json` (fields: `module`, `types`, `browser`).
  - `npm install parcel@nightly`
3. Rename the exported library name in [`./src/targets/browser.ts`](./src/targets/browser.ts).
