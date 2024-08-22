# xdw

[![npm version](https://badgen.net/npm/v/xd)](https://npm.im/xd)

[tsup](https://github.com/egoist/tsup) is similar but focuses more on packet processing, powered by [esbuild](https://github.com/evanw/esbuild).

## what's the difference?

- A more casual package directory
- carry meta options
- carry assets options(.png, .html,...more)
- more universal

## ⚙️ Install

Install it locally in your project folder:

```bash
pnpm add xdw --dev
# Or Yarn
yarn add xdw --dev
```

You can also install it globally but it's not recommended.

## 📖 Usage

### Bundle files

```bash
xd [...file]
```

Files are written into `./dist`.

You can bundle multiple files in one go:

```bash
xd src/index.ts src/bin/bin.ts
```

This will output `dist/index.cjs.js; dist/index.esm.js` and `dist/bin.cjs.js; dist/bin.esm.js`.

> Unlike tsup, Xd is more suitable for a single independent entry file,
> Xd does not preserve the directory structure

### build directory

```bash
xd [...directory]
```

Files are written into `./dist`.

You can build dir in one go:

```
src
 - bin
   index.ts
 index.ts
```

```bash
xd src
```

This will output:

```
dist
 - bin
   index.js
 index.js
```

> You can build multiple directories at once, but it is recommended to use only one directory as filename duplicates will be overwritten

## carry meta

use command `--meta` It works well on some monorepo (pnpm,yarn,npm) applications

- carry package info (`LICENSE`, `README.md`, `CHANGELOG.md`)
- handle `package.publishConfig` and carry package.json
- create `node_modules` lnk file to output(default `dist`)

## Using custom configuration

Like tsup, you can use the config file to configure

Supported file formats

- `xdw.config.ts`
- `xdw.config.js`
- `xdw.config.cjs`
- `xdw.config.json`

### TypeScript / JavaScript

```ts
import { defineConfig } from 'xdw';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true
});
```

## carry assets

You can carry static resources that your project depends on

use command `--assets aaa.png,xxx.vue,assetsDir`

defines it like this in defineConfig

```ts
import { defineConfig } from 'xdw';

export default defineConfig({
  assets: ['aaa.png', 'xxx.vue', 'assetsDir']
});
```

## Credits

[hairyf/ptsup](https://github.com/hairyf/ptsup)
