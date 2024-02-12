// src/query/schema.ts
import { gql } from '@apollo/client';

export const GETQUERY = gql`
  query ($id: ID!) {
    usersPermissionsUser(id: $id) {
      data {
        id
        attributes {
          username
          todos {
            data {
              id
              attributes {
                todoText
                createdAt
              }
            }
          }
        }
      }
    }
  }
`;

export const ADDMUT = gql`
  mutation ($todoText: String!, $user: ID!) {
    createTodo(data: { todoText: $todoText, user: $user }) {
      data {
        id
        attributes {
          todoText
          createdAt
        }
      }
    }
  }
`;
export const UPDATEMUT = gql`
  mutation updateTodo($id: ID!, $todoText: String!) {
    updateTodo(id: $id, data: { todoText: $todoText }) {
      data {
        id
        attributes {
          todoText
          createdAt
        }
      }
    }
  }
`;

export const DELETEMUT = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      data {
        id
        attributes {
          todoText
          createdAt
        }
      }
    }
  }
`;
