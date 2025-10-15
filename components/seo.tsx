import { ArticleJsonLd, NextSeo } from 'next-seo';
import type { DefaultSeoProps } from 'next-seo';
import type { Author, Post } from '../lib/types';

export const SEO: DefaultSeoProps = {
  title: process.env.NEXT_PUBLIC_TITLE,
  description: process.env.NEXT_PUBLIC_DESCRIPTION,
  canonical: process.env.NEXT_PUBLIC_SITEURL,
  openGraph: {
    type: 'website',
    locale: process.env.NEXT_PUBLIC_LANGUAGE,
    url: process.env.NEXT_PUBLIC_SITEURL,
    title: process.env.NEXT_PUBLIC_TITLE,
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITEURL}${process.env.NEXT_PUBLIC_SOCIALBANNER}`,
        alt: process.env.NEXT_PUBLIC_TITLE,
        width: 600,
        height: 600,
      },
    ],
  },
  twitter: {
    handle: process.env.NEXT_PUBLIC_TWITTER,
    site: process.env.NEXT_PUBLIC_TWITTER,
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'author',
      content: process.env.NEXT_PUBLIC_AUTHOR ?? '',
    },
  ],
};

interface PageSeoProps {
  title: string;
  description?: string;
  url: string;
}

export const PageSeo = ({ title, description, url }: PageSeoProps) => {
  return (
    <NextSeo
      title={`${title} | ${process.env.NEXT_PUBLIC_TITLE}`}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
      }}
    />
  );
};

type BlogSeoAuthor = string | Author | Array<string | Author>;

interface BlogSeoProps
  extends Pick<Post, 'summary' | 'date' | 'lastmod' | 'tags'> {
  title?: string;
  author?: BlogSeoAuthor;
  url?: string;
  images?: string[] | string;
  ogImage?: Post['ogImage'];
}

const toIsoString = (value?: string): string => {
  if (!value) {
    return new Date().toISOString();
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
};

const resolveAuthorName = (author?: BlogSeoAuthor): string | string[] => {
  if (!author) {
    return '';
  }

  if (typeof author === 'string') {
    return author;
  }

  if (Array.isArray(author)) {
    const names = author
      .map((item) => (typeof item === 'string' ? item : item?.name ?? ''))
      .filter((name): name is string => Boolean(name));
    return names.length > 0 ? names : '';
  }

  return author.name ?? '';
};

export const BlogSeo = ({
  title,
  author,
  summary,
  date,
  lastmod,
  url,
  tags,
  images = [],
  ogImage,
}: BlogSeoProps) => {
  const publishedAt = toIsoString(date);
  const modifiedAt = toIsoString(lastmod ?? date);
  const normalizedImages = Array.isArray(images)
    ? images
    : images
    ? [images]
    : [];

  const fallbackImage = process.env.NEXT_PUBLIC_SOCIALBANNER
    ? [process.env.NEXT_PUBLIC_SOCIALBANNER]
    : [];

  const imagesArr =
    normalizedImages.length > 0 ? normalizedImages : fallbackImage;

  const featuredImages = imagesArr
    .filter((img): img is string => Boolean(img))
    .map((img) => ({
      url: `${process.env.NEXT_PUBLIC_SITEURL ?? ''}${img}`,
      alt: title ?? '',
    }));

  if (ogImage?.url) {
    featuredImages.unshift({
      url: ogImage.url,
      alt: title ?? '',
    });
  }

  const featuredImageUrls = featuredImages
    .map((img) => img.url)
    .filter((img): img is string => Boolean(img));

  const firstFeaturedImage = featuredImages[0];
  const authorName = resolveAuthorName(author);

  return (
    <>
      <NextSeo
        title={`${title} | ${process.env.NEXT_PUBLIC_TITLE}`}
        description={summary}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            authors: [`${process.env.NEXT_PUBLIC_SITEURL}/about`],
            tags,
          },
          url,
          title,
          description: summary,
          images: featuredImages,
        }}
        additionalMetaTags={
          firstFeaturedImage
            ? [
                {
                  name: 'twitter:image',
                  content: firstFeaturedImage.url,
                },
              ]
            : undefined
        }
      />
      <ArticleJsonLd
        authorName={authorName}
        dateModified={modifiedAt}
        datePublished={publishedAt}
        description={summary || ''}
        images={featuredImageUrls}
        publisherName={process.env.NEXT_PUBLIC_AUTHOR ?? ''}
        title={title || ''}
        url={url || ''}
      />
    </>
  );
};
