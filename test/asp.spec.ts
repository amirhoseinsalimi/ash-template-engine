import 'mocha';
import { expect } from 'chai';
import { TemplateEngine } from '../src';
import { dataNested, dataSimple, dataArray } from '../examples/shared';

describe('ASP Syntax', () => {
  it('should compile simple objects', () => {
    const compiler = new TemplateEngine('asp').compile;

    expect(
      compiler('This car is a <% manufacturer %> <% model %>.', dataSimple),
    ).to.equal('This car is a Mercedes-Benz E63 AMG.');
  });

  it('should compile nested objects', () => {
    const compiler = new TemplateEngine('asp').compile;

    expect(
      compiler(
        'This <% dataNested.category %> has <% dataNested.specs.engine.type %> with <% dataNested.specs.engine.hp %> horsepower, and <% dataNested.specs.doors %> doors.',
        { dataNested },
      ),
    ).to.equal('This car has V8 with 400 horsepower, and 2 doors.');
  });

  it('should compile `if` statements when `true`', () => {
    const compiler = new TemplateEngine('asp').compile;

    expect(
      compiler(
        `<% if (data) {%>
          <% "This should be displayed" %>
          <% } else { %>
          <% "This should not be displayed" %>
        <% } %>`,
        { data: true },
      ).trim(),
    ).to.equal('This should be displayed');
  });

  it('should not compile `if` statements when `false`', () => {
    const compiler = new TemplateEngine('asp').compile;

    expect(
      compiler(
        `<% if (data) {%>
          <% "This should be displayed" %>
          <% } else { %>
          <% "This should not be displayed" %>
        <% } %>`,
        { data: false },
      ).trim(),
    ).to.equal('This should not be displayed');
  });

  it('should compile `for` loops', () => {
    const compiler = new TemplateEngine('asp').compile;

    expect(
      compiler(
        `<% for (let i = 0; i < dataArray.length; i += 1) {%>
          <% dataArray[i].name %> is <% dataArray[i].age %> years old.
          <% } %>`,
        { dataArray },
      ).trim().split('.').map((text) => text.trim()).filter((text) => text),
    ).to.include.members(dataArray.map((person) => `${person.name} is ${person.age} years old`));
  });
});
