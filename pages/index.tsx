import type { GetStaticProps, NextPage } from 'next';
import Container from '../components/container';
import PostPreview from '../components/post-preview';
import Intro from '../components/intro';
import { getAllPosts } from '../lib/api';
import type { PostSummary } from '../lib/types';

interface IndexProps {
  allPosts: PostSummary[];
}

const Index: NextPage<IndexProps> = ({ allPosts }) => {
  return (
    <Container>
      <Intro />
      <PostPreview posts={allPosts} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'summary',
  ]) as PostSummary[];

  return {
    props: { allPosts },
  };
};

export default Index;
