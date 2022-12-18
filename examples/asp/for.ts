import { TemplateEngine } from '../../src';

const template = `<% for (let i = 0; i < 10; i += 1) {%>
    This is the index: <% i %>
    <% } %>`;

const templateEngine = new TemplateEngine('asp');

const result = templateEngine.compile(template, {});

console.log(result);
