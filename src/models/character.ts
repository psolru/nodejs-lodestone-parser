export interface Attribute {
  name: string;
  value: number;
}

export interface Job {
  name: string;
  level: number;
  exp: number;
  total_exp: number;
}

export interface Materia {
  name: string;
  stat: Attribute;
}

export interface GearItem {
  name: string;
  category: string;
  i_level: number;
  equip_class: string;
  equip_level: number;
  stats: Array<Attribute>;
  materia: Array<Materia>;
}

export interface Character {
	name: string;
	server: string;
  datacenter: string;
  portraitUrl: string;
  avatarUrl: string;
  title: string;
  bio: string;
}
