export function dedent(str: string) {
  const ref = str.length - 1 - str.trimLeft().length;

  return str
    .split('\n')
    .map(l => l.substr(ref))
    .join('\n')
    .trim();
}
