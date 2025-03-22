import { gql } from 'graphql-tag';

export const GET_PROJECTS = gql`
  query getProjects {
  projects {
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
  }
}
`;