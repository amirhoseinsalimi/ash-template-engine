import { TemplateEngine } from '../../src';
import { dataSimple } from '../shared';

const template =
  "Hello my name is <% name %> and I'm <% age %> years old. Yes! I'm <% age %>!";

const templateEngine = new TemplateEngine('asp');

const result = templateEngine.compile(template, dataSimple);

console.log(result);
