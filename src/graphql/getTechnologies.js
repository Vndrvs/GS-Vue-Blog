import { gql } from 'graphql-tag';

export const GET_TECHNOLOGIES = gql`
  query getTechnologies {
  technologies {
    documentId
    technologyName
    technologyIcon {
      url
      alternativeText
    }
  }
}
`;