import { ValidFileType } from '@src/typings';
import { detect, lint, resolveFirst, tree } from '@test/helpers/resolve';

describe('no-trailing-zero', () => {
  const options = { 'no-trailing-zero': 1 };

  describe('scss', () => {
    const filename = 'test/sass/no-trailing-zero.scss';
    it('resolves', () => {
      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.scss, options);

      expect(preResolve.warningCount).toBe(8);
      expect(postResolve.warningCount).toBe(0);
    });

    it('does not change file content', () => {
      const preResolvedTree = tree(filename);
      const { ast: postResolveTree } = resolveFirst(filename, options);

      const values: number[] = [];

      preResolvedTree.traverseByType('number', node =>
        values.push(Number(node.content)),
      );
      postResolveTree.traverseByType('number', node => {
        expect(Number(node.content)).toEqual(values.shift());
      });
    });
  });

  describe('sass', () => {
    const filename = 'test/sass/no-trailing-zero.sass';

    it('resolves', () => {
      const { ast } = resolveFirst(filename, options);

      const preResolve = lint(filename, options);
      const postResolve = detect(ast.toString(), ValidFileType.sass, options);

      expect(preResolve.warningCount).toBe(8);
      expect(postResolve.warningCount).toBe(0);
    });

    it('does not change file content', () => {
      const preResolvedTree = tree(filename);
      const { ast: postResolveTree } = resolveFirst(filename, options);

      const values: number[] = [];

      preResolvedTree.traverseByType('number', node =>
        values.push(Number(node.content)),
      );
      postResolveTree.traverseByType('number', node => {
        expect(Number(node.content)).toEqual(values.shift());
      });
    });
  });
});
