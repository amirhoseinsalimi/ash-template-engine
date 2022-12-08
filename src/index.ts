class TemplateEngine {
  static regexpForVariablePlaceholders = /\{\{([^}}]+)?}}/g;
  static unknownRegexp =
    /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;

  currentMatch: RegExpExecArray = undefined;
  cursor = 0;
  generatedTemplate = '';
  result = '';
  code = 'with(obj) { var r=[];\n'; // FIXME: Use better names

  constructor() {
    Object.getOwnPropertyNames(TemplateEngine.prototype).forEach(
      (key: keyof TemplateEngine) => {
        // @ts-ignore
        this[key] = this[key].bind(this);
      },
    );
  }

  compile(template: string, data: Record<string, unknown>) {
    this.generatedTemplate = template;

    while (
      (this.currentMatch =
        TemplateEngine.regexpForVariablePlaceholders.exec(template))
    ) {
      this.add(template.slice(this.cursor, this.currentMatch.index))(
        this.currentMatch[1],
        true,
      );

      this.moveCursor(this.currentMatch.index + this.currentMatch[0].length);
    }

    this.add(template.substr(this.cursor, template.length - this.cursor));

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
      ? (this.code += line.match(TemplateEngine.unknownRegexp)
          ? `${line}`
          : 'r.push(' + line + ');\n')
      : (this.code +=
          line !== '' ? `r.push("${line.replace(/"/g, '\\"')}");` : '');

    return this.add;
  }

  moveCursor(to: number) {
    this.cursor = to;
  }
}

const template =
  "Hello my name is {{ name }} and I'm {{ age }} years old. Yes! I'm {{ age }}!";
const data = {
  name: 'Amir Hosein',
  age: 26,
};

const templateEngine = new TemplateEngine();
const res = templateEngine.compile(template, data);

console.log(res);