import { TemplateEngine } from '../../src';

const template =
  "Hello my name is <% name %> and I'm <% age %> years old. Yes! I'm <% age %>!";

const data = {
  name: 'Amir Hosein',
  age: 26,
};

const templateEngine = new TemplateEngine('asp');

const res1 = templateEngine.compile(template, data);

console.log(res1);
