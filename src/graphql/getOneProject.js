import { gql } from '@apollo/client/core';

export const GET_ONE_PROJECT = gql`
  query Project($documentId: ID!) {
    project(documentId: $documentId) {
      documentId
      projectTitle
      projectHeading
      projectDescription
      projectCover {
        url
        alternativeText
      }
      technologies {
        technologyName
        technologyIcon {
          url
          alternativeText
        }
      }
      blog_posts {
          documentId
          publishedAt
          Title
          H1
          Cover {
            url
            alternativeText
          }
          Content
      }
    }
  }
`;