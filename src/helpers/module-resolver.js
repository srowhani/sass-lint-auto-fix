module.exports = {
  resolve (_definedResolver) {
    return new Promise((resolve, reject) => {
      try {
        resolve(require(`${__dirname}/../resolvers/${_definedResolver}`));
      } catch (e) {
        reject(e);
      }
    })
  }
}
