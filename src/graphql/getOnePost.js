import { gql } from '@apollo/client/core';

export const GET_ONE_POST = gql`
  query BlogPost($documentId: ID!) {
    blogPost(documentId: $documentId) {
      documentId
      Title
      H1
      Content
      Content2
      Content3
      Content4
      Content5
      Content6
      Author
      publishedAt
      Cover {
        url
        alternativeText
      }
      pic1 {
        url
        alternativeText
      }
      pic2 {
        url
        alternativeText
      }
      pic3 {
        url
        alternativeText
      }
      pic4 {
        url
        alternativeText
      }
      pic5 {
        url
        alternativeText
      }
    }
  }
`;
