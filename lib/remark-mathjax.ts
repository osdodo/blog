import { visit } from 'unist-util-visit';

const remarkMathjax = () => {
  const visitor = async (node: any) => {
    const mathjax = require('mathjax');
    const MathJax = await mathjax.init({
      loader: { load: ['input/tex', 'output/svg'] },
    });
    const svg = MathJax.tex2svg(node.value);
    const svgHtml = MathJax.startup.adaptor.outerHTML(svg);
    node.type = 'html';
    node.value = svgHtml;
    if (node.data) {
      delete node.data;
    }
  };

  const transformer = (tree: any) => {
    // @ts-ignore
    visit(tree, 'inlineMath', visitor);
    // @ts-ignore
    visit(tree, 'math', visitor);
  };

  return transformer;
};

export default remarkMathjax;
