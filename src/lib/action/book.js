'use server';

import { serverMutation } from "../core/server";

export const postBook = async (bookData) => {
  return await serverMutation('/books', bookData);
}



export const updateBook = async (bookId, data) => {
  return await serverMutation(`/books/${bookId}`, data, 'PATCH');
};

export const deleteBook = async (bookId) => {
  return await serverMutation(`/books/${bookId}`, {}, 'DELETE');
}