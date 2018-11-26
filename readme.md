# Daylight

## Installation
This is a simple app to setup. Run these two commands:
```sh
# Install dependencies
$ npm install
$ npm install http-server -g
```

## Usage
Depending on your development preferences, there are two npm scripts to choose from:
```sh
$ npm start
$ npm run dev:liveReload
```

### Deployment
To prep your app for deployment, run:
```sh
$ npm build-production
```
This will minify your `js` and `css`, name the files accordingly, and put them in `dist/`.