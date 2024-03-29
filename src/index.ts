import { Syntax } from './types/general';

export class TemplateEngine {
  static regexpForVariablePlaceholders = /\{\{([^}}]+)?}}/g;
  static keywordsRegexp =
    /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;

  currentMatch: RegExpExecArray = undefined;
  cursor = 0;
  result = '';
  code = 'with(obj) { var r=[];\n';

  private constructor(syntax: Syntax) {
    if (syntax === 'mustache') {
      TemplateEngine.regexpForVariablePlaceholders = /\{\{([^}}]+)?}}/g;
    } else if (syntax === 'asp') {
      TemplateEngine.regexpForVariablePlaceholders = /<%([^%>]+)?%>/g;
    }

    Object.getOwnPropertyNames(TemplateEngine.prototype).forEach(
      (key: keyof TemplateEngine) => {
        // @ts-ignore
        this[key] = this[key].bind(this);
      },
    );
  }

  static createWithMustacheSyntax() {
    return new this('mustache');
  }

  static createWithAspSyntax() {
    return new this('asp');
  }

  compile(template: string, data: Record<string, unknown> | Array<unknown>) {
    while (
      (this.currentMatch =
        TemplateEngine.regexpForVariablePlaceholders.exec(template))
    ) {
      this.add(
        template.slice(this.cursor, this.currentMatch.index),
      )

      this.add(this.currentMatch[1], true);

      this.moveCursor(this.currentMatch.index + this.currentMatch[0].length);
    }

    this.add(
      template.substring(this.cursor, template.length),
    );

    this.code = `${this.code}return r.join(""); }`.replace(/[\r\t\n]/g, ' ');

    try {
      this.result = new Function('obj', this.code).apply(data, [data]);
    } catch (err) {
      console.error(`'${err.message}'`, ' in \n\nCode:\n', this.code, '\n');
    }

    return this.result;
  }

  add(line: string, js = false) {
    js
      ? (this.code += line.match(TemplateEngine.keywordsRegexp)
          ? `${line}`
          : `r.push(${line});`)
      : (this.code +=
          line !== '' ? `r.push("${line.replace(/"/g, '\\"')}");` : '');
  }

  moveCursor(to: number) {
    this.cursor = to;
  }
}
