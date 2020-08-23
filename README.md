# react-datastoragesqlite-app
Sample project that shows an integration of
 - [capacitor-data-storage-sqlite] (https://github.com/jepiqueau/capacitor-data-storage-sqlite/blob/master/readme.md)

 - [react-data-storage-sqlite-hook] (https://www.npmjs.com/package/react-data-storage-sqlite-hook)

in React App.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project

To start clone the project
```bash
git clone https://github.com/jepiqueau/react-datastoragesqlite-app.git 
cd react-datastoragesqlite-app
git remote rm origin
npm install
```


To install the latest release of the ```capacitor-data-storage-sqlite``` plugin

```bash
npm run update
npx cap update
npm run build
npx cap copy
npx cap copy web
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
npx cap open @capacitor-community/eletron
```
