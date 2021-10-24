https://stackoverflow.com/questions/39172536/running-npm-scripts-sequentially


https://stackoverflow.com/questions/47957124/how-can-i-run-multiple-npm-scripts-at-the-same-time/59585721#59585721


```
"scripts": {
    "lint":  "eslint src",
    "build": "babel src -o lib"
}

$ npm-run-all --parallel lint build

```