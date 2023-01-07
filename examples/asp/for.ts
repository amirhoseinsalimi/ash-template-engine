import { TemplateEngine } from '../../src';
import { dataArray } from '../shared';

const template = `<% for (let i = 0; i < dataArray.length; i += 1) {%>
    <% dataArray[i].name %> is <% dataArray[i].age %> years old.
    <% } %>`;

const templateEngine = new TemplateEngine('asp');

const result = templateEngine.compile(template, { dataArray });

console.log(result);
