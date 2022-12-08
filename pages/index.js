import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {GraphQLClient, gql} from 'graphql-request'
import BlogCard from "../components/BlogCard";

const graphcms = new GraphQLClient('https://api-eu-west-2.hygraph.com/v2/clbb591kl0isi01uo8q0o56g2/master')

const QUERY = gql`
  {
    posts {
      id,
      title,
      datePublished,
      slug,
      content {
        html
      }
      author {
        name,
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blogs</title>
        <meta name="description" content="Blog Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublishde={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  )
}
