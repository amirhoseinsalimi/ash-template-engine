import { TemplateEngine } from '../../src';
import { dataSimple } from '../shared';

const template = 'This car is a <% manufacturer %> <% model %>.';

const templateEngine = TemplateEngine.createWithAspSyntax();

const result = templateEngine.compile(template, dataSimple);

console.log(result);
