import { TemplateEngine } from '../../src';
import { dataNested } from '../shared';

const template =
  'This <% dataNested.category %> has <% dataNested.specs.engine.type %> with <% dataNested.specs.engine.hp %> horsepower, and <% dataNested.specs.doors %> doors.';

const templateEngine = new TemplateEngine('asp');

const result = templateEngine.compile(template, { dataNested });

console.log(result);
