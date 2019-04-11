# rainypack-cli[WIP]

[![npm](https://img.shields.io/npm/v/rainypack-cli.svg?style=flat-square)](https://www.npmjs.com/package/rainypack-cli)  [![npm](https://img.shields.io/npm/dm/rainypack-cli.svg?style=flat-square)](https://www.npmjs.com/package/rainypack-cli)  [![npm](https://img.shields.io/npm/dt/rainypack-cli.svg?style=flat-square)](https://www.npmjs.com/package/rainypack-cli)  [![npm](https://img.shields.io/npm/l/rainypack-cli.svg?style=flat-square)](https://www.npmjs.com/package/rainypack-cli)

CLI for [rainypack](https://github.com/geekrainy/rainypack).

## Getting Started

```shell
# Install
$ yarn global add rainypack-cli

# Create rainypack project
$ rp new demo

# Start rainypack
$ cd demo
$ yarn start
```

## Usage

```shell
$ rp --help
Usage: rp [options] [command]

Options:
  -v, --version        output the version number
  -h, --help           output usage information

Commands:
  start                display welcome page
  init [options]       initial a rainypack project in current directory
  new [options] [dir]  initial a new rainypack
```

## Generated File Tree

```shell
# webpack version
./
├── .babelrc
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .stylelintrc
├── README.md
├── package.json
├── src
│   ├── App.js
│   ├── App.less
│   ├── avatar.jpg
│   ├── index.ejs
│   ├── index.js
│   └── utils.js
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── yarn.lock

# rollup version

./
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .prettierignore
├── .prettierrc
├── .stylelintrc
├── README.md
├── package.json
├── src
│   ├── App.less
│   ├── App.tsx
│   ├── avatar.jpg
│   ├── index.ejs
│   ├── index.tsx
│   └── utils.tsx
├── tsconfig.json
├── types
│   └── global.d.ts
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── yarn.lock
```
