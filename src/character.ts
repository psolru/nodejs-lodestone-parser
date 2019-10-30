import {Character, Job, Attribute, GearItem, Materia} from "./models/character";
import { toSnakeCase } from "./utils";
import { LODESTONE_URL } from "./index";

export class CharacterParser {
  private readonly _$: CheerioStatic;

  // Pass by reference so we can just load new data into the LodestoneParser object
  // instead of initiating every class new. Oh, and ignore ts stuff because reasons…
  // @ts-ignore
  constructor({ $ }) {
    this._$ = $;
  }

  private parseHtml(descriptor: string): string {
    return this._$(descriptor).html() || '';
  }

  private parseText(descriptor: string): string {
    return this._$(descriptor).text().trim() || '';
  }

  private parseSrc(descriptor: string): string {
    return this._$(descriptor).attr('src').trim() || '';
  }

  basicInfo(): Character {
    const name:string       = this.parseHtml('.frame__chara__name');
    const title:string          = this.parseHtml('.frame__chara__title');

    // server and datacenter (Raw: "Cerberus&nbsp;(Chaos)")
    const potatoLocation:string = this.parseText('.frame__chara__world');
    let server:string,
      datacenter:string;
    [ server, datacenter ] = potatoLocation.split('\xa0');
    datacenter = datacenter.replace(/\(|\)/g, '');

    // character images (other Domain)
    let portraitUrl = this.parseSrc('.frame__chara__face img');
    portraitUrl = LODESTONE_URL.square_image + portraitUrl.split('/')[4];

    // const avatarUrl: string = this.parseHtml('.character__detail__image');
    let avatarUrl = this._$('.character__detail__image a').attr('href');
    avatarUrl = LODESTONE_URL.square_image + avatarUrl.split('/')[4];

    // character bio
    let bio = this.parseText('.character__selfintroduction');

    return { name, server, datacenter, portraitUrl, avatarUrl, title, bio };
  }

  jobs(): Array<Job> {
    const jobs:Array<Job> = [];
    const jobHtmlElements:Cheerio = this._$('.character__job > li');
    jobHtmlElements.each((_, node:CheerioElement) => {
      let job = this._$(node);

      // Jobname
      let name:string = toSnakeCase(job.find('.character__job__name').text());

      // Level
      let level:number = parseInt(job.find('.character__job__level').text());

      // experience points (Raw: "123 / 200" OR "-- / --")
      let expRaw: Array<string> = job.find('.character__job__exp').text().split('/');
      let [exp, total_exp] = expRaw.map(el => {
        return parseInt(el.replace(/,/g, ''));
      });

      jobs.push({ name, level, exp, total_exp })
    });
    return jobs;
  }

  attributes(): Array<Attribute> {
    const attributes:Array<Attribute> = [];

    let list = this._$('.character__param__list tr');
    list.each((_, node) => {
      let name = this._$(node).find('th').text();
      name = toSnakeCase(name);

      let value = parseInt(this._$(node).find('td').text());

      attributes.push({ name, value, });
    });

    return attributes;
  }

  gear(): Array<GearItem> {
    let list: Array<GearItem> = [];

    let detailboxWrapper = this._$('.character__view').first().find('.db-tooltip.db-tooltip__wrapper.item_detail_box');
    detailboxWrapper.each((_, detailbox: CheerioElement) => {

      let name: string = this._$(detailbox).find('.db-tooltip__item__name').text();
      let category: string = this._$(detailbox).find('.db-tooltip__item__category').text();

      // iLevel (Raw: "Item Level 460")
      let iLevelRaw: string = this._$(detailbox).find('.db-tooltip__item__level').text();
      let iLevel: number = parseInt(iLevelRaw.split(' ')[iLevelRaw.split(' ').length - 1]);

      let equip_class: string = this._$(detailbox).find('.db-tooltip__item_equipment__class').text();
      let equip_level: number = parseInt(this._$(detailbox).find('.db-tooltip__item_equipment__level').text().split(' ')[1]);

      let statsRaw: Cheerio|Array<string> = this._$(detailbox).find('.db-tooltip__basic_bonus li');
      statsRaw = statsRaw.map((_:number, statItem: CheerioElement) => {
        return this._$(statItem).text().split('+')
      }).get();

      let stats: Array<Attribute> = [];
      for (let i = 0; i < statsRaw.length; i = i + 2) {
        let name:string = toSnakeCase(statsRaw[i]),
            value: number = parseInt(statsRaw[i + 1]);
        stats[i] = { name, value };
      }

      let materiaList: Array<Materia> = [];
      let materiaSlots = this._$(detailbox).find('.db-tooltip__materia li');
      materiaSlots.each((_, materia) => {
        let materiaName = this._$(materia).find('.db-tooltip__materia__txt').first().contents().filter(function () {
          // @ts-ignore
          return this.type === 'text';
        }).text();

        let [name, value] = this._$(materia).find('.db-tooltip__materia__txt').find('span').text().split('+');
        // console.log(this._$(materia).html());
        // console.log(this._$(materia).find('span').html());

        if (materiaName) {
          materiaList.push({
            name: materiaName,
            stat: {
              name: toSnakeCase(name),
              value: parseInt(value)
            }
          })
        }
      });

      list.push({
        name: name,
        category: category,
        i_level: iLevel,
        equip_class: equip_class,
        equip_level: equip_level,
        stats: stats,
        materia: materiaList
      });
    });

    return list;
  }
}
