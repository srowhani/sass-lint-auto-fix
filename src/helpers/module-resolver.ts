export default function resolve(_definedResolver: string) {
  return import(`${__dirname}/../resolvers/${_definedResolver}`).then(
    _instance => _instance.default,
  );
}
