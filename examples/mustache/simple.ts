import { TemplateEngine } from '../../src';
import { dataSimple } from '../shared';

const template =
  'This car is a {{ manufacturer }} {{ model }}.';

const templateEngine = TemplateEngine.createWithMustacheSyntax();

const res = templateEngine.compile(template, dataSimple);

console.log(res);
