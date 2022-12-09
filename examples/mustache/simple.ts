import { TemplateEngine } from '../../src';
import type { Syntax } from '../../src/types/general';

const template =
  "Hello my name is {{ name }} and I'm {{ age }} years old. Yes! I'm {{ age }}!";

const data = {
  name: 'Amir Hosein',
  age: 26,
};

const templateEngine1 = new TemplateEngine('mustache');

const res = templateEngine1.compile(template, data);

console.log(res);
