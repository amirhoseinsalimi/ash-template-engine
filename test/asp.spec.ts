import 'mocha';
import { expect } from 'chai';
import { TemplateEngine } from '../src';
import { dataNested, dataSimple } from '../examples/shared';

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
});
