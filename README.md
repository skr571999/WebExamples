# Dummy Webpack Demo

## Getting Started

```sh
npm i -D webpack webpack-cli
npm i lodash

npm run build
```

## Asset Management

```sh
npm install --save-dev style-loader css-loader

npm install --save-dev csv-loader xml-loader

npm install toml yamljs json5 --save-dev

npm run build

npm uninstall css-loader csv-loader json5 style-loader toml xml-loader yamljs
```

## Output Management

```sh
npm install --save-dev html-webpack-plugin

npm install --save-dev clean-webpack-plugin
```

## Development

```sh
npm run watch

npm install --save-dev webpack-dev-server
npm start

npm install --save-dev express webpack-dev-middleware
npm run server
```
