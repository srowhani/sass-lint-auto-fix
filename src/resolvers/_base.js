module.exports = class BaseResolver {
  constructor (ast, parser) {
    this._ast = ast;
    this._parser = parser;
  };

  fix () {
    return Promise.reject('Must be implemented');
  };

  get ast () {
    return this._ast;
  };

  get parser () {
    return this._parser;
  };
}
