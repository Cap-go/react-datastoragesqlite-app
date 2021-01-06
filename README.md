<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">React Data Storage SQLite App Starter</h3>
<p align="center"><strong><code>react-datastoragesqlite-app</code></strong></p>
<p align="center">React application demonstrating the use of the</p>
<p align="center"><strong><code>capacitor-data-storage-sqlite</code></strong></p>
<br>
<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2021?style=flat-square" />
  <a href="https://github.com/jepiqueau/react-datastoragesqlite-app"><img src="https://img.shields.io/github/license/jepiqueau/react-datastoragesqlite-app?style=flat-square" /></a>
  <a href="https://github.com/jepiqueau/react-datastoragesqlite-app"><img src="https://img.shields.io/github/package-json/v/jepiqueau/react-datastoragesqlite-app?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |


## Installation

To start clone the project
```bash
git clone https://github.com/jepiqueau/react-datastoragesqlite-app.git 
cd react-datastoragesqlite-app
git remote rm origin
npm install
cd electron
npm install
cd ..
```


To install the latest release of the ```capacitor-data-storage-sqlite``` plugin

```bash
npm run update
npx cap sync
npx cap sync @capacitor-community/electron
npm run build
npx cap copy
npx cap copy web
npx cap copy @capacitor-community/electron
```

## Running the app

### BROWSER

```
npx cap serve
```

### IOS

```
npx cap open ios
```

### ANDROID

```
npx cap open android
```

### ELECTRON

```
npx cap open @capacitor-community/electron
```

## Documentation

 - [capacitor-data-storage-sqlite](https://github.com/jepiqueau/capacitor-data-storage-sqlite/blob/master/readme.md)

 - [react-data-storage-sqlite-hook](https://www.npmjs.com/package/react-data-storage-sqlite-hook)


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jepiqueau"><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="100px;" alt=""/><br /><sub><b>Jean Pierre Quéau</b></sub></a><br /><a href="https://github.com/jepiqueau/react-datastoragesqlite-app/commits?author=jepiqueau" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
