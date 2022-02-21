import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation sendMessage($to: Int!, $text: String!) {
    sendMessage(to: $to, text: $text) {
      _id
      from
      to
      text
      createdAt
      user {
        _id
        name
        avatar
      }
    }
  }
`;

export const MESSAGER_QUERY = gql`
  query Messages($id: Int!) {
    getMessages(_id: $id) {
      _id
      text
      from
      to
      createdAt
      user {
        _id
        name
        avatar
      }
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      from
      to
      text
      _id
      user {
        _id
        name
        avatar
      }
    }
  }
`;
