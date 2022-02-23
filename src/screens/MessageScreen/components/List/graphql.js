import { gql } from '@apollo/client';

export const MESSAGER_QUERY = gql`
  query Messages($id: Int!) {
    getMessages(id: $id) {
      uuid
      content
      from
      to
      createdAt
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      from
      to
      content
      uuid
    }
  }
`;
