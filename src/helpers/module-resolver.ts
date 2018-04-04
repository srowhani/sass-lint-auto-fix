export default function resolve(_definedResolver: string) {
  return Promise.resolve(
    require(`${__dirname}/resolvers/${_definedResolver}`).default,
  );
}
