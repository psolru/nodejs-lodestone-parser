import * as fs from "fs";

interface Config {
  data: string;
  data_2: string;
  MIN_LEVEL: number;
  MAX_LEVEL: number;
  JOBS: Array<string>;
  JOBS_ABBREVIATION: Array<string>;
  ATTRIBUTES: Array<string>;
}

let Config:Config = {
  data: '',
  data_2: '',
  MIN_LEVEL: 0,
  MAX_LEVEL: 80,
  JOBS: ['gladiator', 'pugilist', 'marauder', 'lancer', 'archer', 'conjurer', 'thaumaturge', 'arcanist', 'rogue', 'machinist', 'dark_knight', 'astrologian', 'samurai', 'red_mage', 'blue_mage', 'gunbreaker', 'dancer', 'paladin','warrior','dark_knight','gunbreaker','monk','dragoon','ninja','samurai','white_mage','scholar','astrologian','bard','machinist','dancer','black_mage','summoner','red_mage','blue_mage','carpenter','blacksmith','armorer','goldsmith','leatherworker','weaver','alchemist','culinarian','miner','botanist','fisher'],
  JOBS_ABBREVIATION: ['gla', 'pgl', 'mrd', 'lnc', 'arc', 'cnj', 'thm', 'acn', 'rog', 'mch', 'drk', 'ast', 'sam', 'rdm', 'blu', 'gnb', 'dnc', 'pld','war','drk','gnb','mnk','drg','mim','sam','whm','sch','ast','brd','mch','dnc','blm','smn','rdm','blu','crp','bsm','arm','gsm','ltw','wvr','alc','cul','min','btn','fsh'],
  ATTRIBUTES: ["strength", "dexterity", "vitality", "intelligence", "mind", "critical_hit_rate", "critical_hit", "determination", "direct_hit_rate", "defense", "magic_defense", "attack_power", "skill_speed", "attack_magic_potency", "healing_magic_potency", "spell_speed", "tenacity", "piety", "gathering", "perception", "craftsmanship", "control", "c_p", "g_p", "h_p", "m_p", "t_p"],
};

try {
  Config.data = fs.readFileSync('src/test-data/11756305.html', 'utf8');
  Config.data_2 = fs.readFileSync('src/test-data/21541412.html', 'utf8');
} catch (err) {
  console.error(err);
  process.exit(1)
}

export { Config }
