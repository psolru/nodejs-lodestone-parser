import * as cheerio from 'cheerio'
import { CharacterParser } from "./character";

let LODESTONE_URL = {
  character: 'https://na.finalfantasyxiv.com/lodestone/character/',
  square_image: 'https://img2.finalfantasyxiv.com/f/'
};
export { LODESTONE_URL }

export class LodestoneParser {
  // @ts-ignore
  private _rawData: string;
  // @ts-ignore
  private _$:CheerioStatic;

  constructor(data: string) {
    this.load(data);
  }

  load(data:string) {
    this._rawData = data;
    this._$ = cheerio.load(data);
  }

  character() {
    return new CharacterParser({$: this._$});
  }
}
