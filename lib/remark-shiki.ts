import { visit } from 'unist-util-visit';

type ShikiOptions = {
  theme?: string;
  langs?: string[];
};

const shiki = require('shiki') as typeof import('shiki');

function attacher(options: ShikiOptions = {}) {
  const theme = options.theme ?? 'monokai';
  const langs = options.langs ?? undefined;

  return async function transformer(tree: unknown) {
    /**
     * Since `getHighlighter` is async, this means that the `unified` processor
     * cannot be run with `processSync`. We could accept a `highlighter` instance
     * via plugin options to get around this.
     */
    // @ts-ignore
    const highlighter = await shiki.getHighlighter({ theme, langs });

    visit(tree as any, 'code', (node: any) => {
      const highlighted = highlighter.codeToHtml(
        node.value,
        node.lang ?? 'text'
      );
      
      // Add a class to the pre element for better styling
      const styledHtml = highlighted.replace('<pre ', '<pre class="shiki-code" ');
      
      node.type = 'html';
      node.value = styledHtml;
    });
  };
}

export default attacher;
