export function resolve (_definedResolver) {
  return import(`${__dirname}/../resolvers/${_definedResolver}`)
    .then(_instance => _instance.default)
}
