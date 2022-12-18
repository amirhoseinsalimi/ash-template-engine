import { TemplateEngine } from '../../src';

const template = `<% if (true) {%>
    <% "This should be displayed" %>
    <% } else { %>
    <% "This should not be displayed" %>
    <% } %>`;

const templateEngine = new TemplateEngine('asp');

const result = templateEngine.compile(template, {});

console.log(result);
