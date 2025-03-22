import { gql } from '@apollo/client/core';

export const GET_POST_ID_BY_SLUG = gql`
  query BlogPostBySlug($slug: String!) {
    blogPosts(filters: { Slug: { eq: $slug } }) {
      data {
        id
      }
    }
  }
`;