import { remark } from 'remark';
import html from 'remark-html';
import math from 'remark-math';
import withMathjax from './remark-mathjax';
import withShiki from './remark-shiki';

export default async function markdownToHtml(
  markdown: string
): Promise<string> {
  const result = await remark()
    .use(math)
    .use(withMathjax)
    // @ts-ignore - unified plugin type mismatch
    .use(withShiki, {
      theme: 'monokai', // https://github.com/shikijs/shiki/blob/master/docs/themes.md
    })
    // @ts-ignore - allow raw HTML passthrough
    .use(html, { allowDangerousHtml: true, sanitize: false })
    .process(markdown);
  return result.toString();
}
