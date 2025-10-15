import markdownStyles from '../styles/markdown-styles.module.css';

interface PostBodyProps {
  content?: string;
}

export default function PostBody({ content }: PostBodyProps) {
  return (
    <div className="w-full">
      <div
        className={markdownStyles.markdown}
        dangerouslySetInnerHTML={{ __html: content ?? '' }}
      />
    </div>
  );
}
