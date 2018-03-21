export default class BaseResolver {
  constructor (ast) {
    this._ast = ast;
  };

  fix () {
    return Promise.reject('Must be implemented');
  };

  get ast () {
    return this._ast;
  };
}
