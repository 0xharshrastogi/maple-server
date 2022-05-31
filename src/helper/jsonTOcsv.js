class JsonToCsv {
  constructor(data) {
    this.data = data;
  }

  convert() {
    let result = [];
    for (const value of this.data) result.push(Object.values(value).join(', '));
    return result.join('\n');
  }
}

export default JsonToCsv;
