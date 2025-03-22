import { gql } from 'graphql-tag';

export const GET_POSTS = gql`
  query getposts {
  blogPosts {
    documentId
    publishedAt
    Slug
    Author
    Title
    H1
    Content
    Cover {
      url
      alternativeText
    }
  }

}
`;