'use server';

import { serverFetch } from "../core/server";

export const getAllBooks = async () => {
  return await serverFetch('/books');
}

export const getBookById = async (id) => {
  return await serverFetch(`/books/${id}`);
}