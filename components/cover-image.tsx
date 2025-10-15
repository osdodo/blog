import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface CoverImageProps {
  title?: string;
  src?: string;
  slug?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function CoverImage({
  title,
  src,
  slug,
  className,
  width,
  height,
}: CoverImageProps) {
  if (!src) {
    return null;
  }

  const imageClassName = cn(
    'rounded-2xl object-cover transition duration-500',
    {
      'hover:scale-[1.01] hover:brightness-105': Boolean(slug),
    },
    className
  );

  const image = (
    <Image
      className={imageClassName}
      src={src}
      alt={`Cover Image for ${title ?? 'post'}`}
      width={width || 800}
      height={height || 400}
      layout="responsive"
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title ?? 'Post cover image'}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
