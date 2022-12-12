import { TemplateEngine } from '../../src';
import { dataSimple } from '../shared';

const template =
  'This car is a {{ manufacturer }} {{ model }}.';

const templateEngine = new TemplateEngine('mustache');

const res = templateEngine.compile(template, dataSimple);

console.log(res);
