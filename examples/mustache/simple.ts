import { TemplateEngine } from '../../src';
import type { Syntax } from '../../src/types/general';
import { dataSimple } from '../shared';

const template =
  "Hello my name is {{ name }} and I'm {{ age }} years old. Yes! I'm {{ age }}!";

const templateEngine1 = new TemplateEngine('mustache');

const res = templateEngine1.compile(template, dataSimple);

console.log(res);
