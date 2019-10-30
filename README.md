# LodestoneParser

![CircleCI](https://img.shields.io/circleci/build/github/psolru/nodejs-lodestone-parser)
![npm](https://img.shields.io/npm/v/lodestone-parser)
![David](https://img.shields.io/david/psolru/nodejs-lodestone-parser)
![David](https://img.shields.io/david/dev/psolru/nodejs-lodestone-parser)

### Install

```shell
npm i -S lodestone-parser
```
### Usage
```js
import { CharacterParser } from 'lodestone-parser'
import * as axios from 'axios'

axios.get('https://de.finalfantasyxiv.com/lodestone/character/11756305')
  .then(response => {
    let parser = new CharacterParser(response.data);
    console.log(parser.getBasicInfo());
  })
  .catch(error => {
    console.log(error);
  });
```
