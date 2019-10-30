// import configs and test-data
import { Config } from './config'
const testData = Config.data;

// do the actual tests
import { LodestoneParser } from '../index'
import { Attribute, GearItem, Job} from '../models/character';


test('LodestoneParser().load()', () => {
  const parser = new LodestoneParser(testData);
  const { name } = parser.character().basicInfo();
  expect(name).toBe('Solin Rush');

  parser.load(Config.data_2);

  const { name: name_2 } = parser.character().basicInfo();
  expect(name_2).toBe('Marie Rush');
});

test('LodestoneParser().character().basicInfo()', () => {
  const parser = new LodestoneParser(testData);
  const {name, server, datacenter, title, bio} = parser.character().basicInfo();

  expect(name).toBe('Solin Rush');
  expect(server).toBe('Cerberus');
  expect(datacenter).toBe('Chaos');
  expect(title).toBe('God of Magic');
  expect(typeof bio).toBe('string');
});

test('LodestoneParser().character().jobs()', () => {
  const parser = new LodestoneParser(testData);
  const jobs = parser.character().jobs();

  jobs.forEach((job: Job) => {
    // Check if jobname is an actual job
    expect(Config.JOBS).toContain(job.name);

    // Check for Level type and range
    expect(typeof job.level).toBe('number');
    try {
      expect(job.level).toBeGreaterThanOrEqual(Config.MIN_LEVEL);
      expect(job.level).toBeLessThanOrEqual(Config.MAX_LEVEL);
    } catch (e) {
      expect(job.level).toBeNaN;
    }

    // check if exp is a number
    expect(typeof job.exp).toBe('number');
    expect(typeof job.total_exp).toBe('number');
  });
});

test('LodestoneParser().character().attributes()', () => {
  const parser = new LodestoneParser(testData);
  const attributes = parser.character().attributes();

  attributes.forEach((attribute: Attribute) => {
    // Check if attribute is an actual attribute
    expect(Config.ATTRIBUTES).toContain(attribute.name);

    // check if value is a positive number
    expect(attribute.value).toBeGreaterThanOrEqual(0);
  });
});

test('LodestoneParser().character().gear()', () => {
  const parser = new LodestoneParser(testData);
  const gear = parser.character().gear();
  gear.forEach((item: GearItem) => {

    expect(typeof item.name).toBe('string');
    expect(typeof item.category).toBe('string');
    expect(typeof item.equip_class).toBe('string');

    expect(item.i_level).toBeGreaterThanOrEqual(0);
    expect(item.equip_level).toBeGreaterThanOrEqual(0);

    item.stats.forEach(stat => {
      // Check if attribute is an actual attribute
      expect(Config.ATTRIBUTES).toContain(stat.name);

      // check if value is a positive number
      expect(stat.value).toBeGreaterThanOrEqual(0);
    });

    item.materia.forEach(materia => {
      // Check if attribute is an actual attribute
      expect(typeof materia.name).toBe('string');

      // Check if attribute is an actual attribute
      expect(Config.ATTRIBUTES).toContain(materia.stat.name);

      // check if value is a positive number
      expect(materia.stat.value).toBeGreaterThanOrEqual(0);
    });

  });
});
