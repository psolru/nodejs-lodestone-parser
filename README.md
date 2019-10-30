# LodestoneParser

![CircleCI](https://img.shields.io/circleci/build/github/psolru/nodejs-lodestone-parser)
![npm](https://img.shields.io/npm/v/lodestone-parser)
![David](https://img.shields.io/david/psolru/nodejs-lodestone-parser)
![David](https://img.shields.io/david/dev/psolru/nodejs-lodestone-parser)

### Install

```shell
npm i -S lodestone-parser
```
### Example
```js
import { LODESTONE_URL, LodestoneParser } from 'lodestone-parser'
import Axios from 'axios';

Axios.get(LODESTONE_URL.character + '11756305')
.then(res => {
    const parser = new LodestoneParser(res.data);
    console.log({
        info: parser.character().basicInfo(),
        attributes: parser.character().attributes(),
        gear: parser.character().gear(),
        jobs: parser.character().jobs()
    });
});
```
