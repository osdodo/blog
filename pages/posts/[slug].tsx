import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import Navigation from '../../components/navigation';
import { BlogSeo } from '../../components/seo';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import type { PostDetail } from '../../lib/types';

type PostPageProps = {
  post: PostDetail;
};

type Params = {
  slug: string;
};

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  useEffect(() => {
    window.AV = require('leancloud-storage');
    const Valine = require('valine');

    new Valine({
      el: '#vcomments',
      appId: process.env.NEXT_PUBLIC_VALINEAPPID,
      appKey: process.env.NEXT_PUBLIC_VALINEAPPKEY,
      path: post.slug,
      notify: false,
      verify: true,
      visitor: true,
      avatar: 'retro',
      placeholder: '据说留言的人都变好看了呢♪(^∇^*)',
    });
  }, [post.slug]);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <BlogSeo
        {...post}
        url={`${process.env.NEXT_PUBLIC_SITEURL}/posts/${post.slug}`}
      />
      <Container>
        <article className="mb-32">
          <PostHeader
            title={post.title}
            date={post.date}
            author={post.author}
            path={post.slug}
          />
          <PostBody content={post.content} />
          <div id="vcomments" className="w-full mt-10 mb-5"></div>
        </article>
      </Container>
      <Navigation />
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps<PostPageProps, Params> = async ({
  params,
}) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'summary',
    'images',
    'lastmod',
    'tags',
  ]) as PostDetail;

  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = getAllPosts(['slug']) as PostDetail[];

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
