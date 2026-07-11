'use server';

import { serverFetch } from "../core/server";

export const getAllBooks = async ({ search = '', category = '', page = 1 } = {}) => {
 const params = new URLSearchParams({ search, category, page, limit: 16 });
  return await serverFetch(`/books?${params.toString()}`);
};

export const getBookById = async (id) => {
  return await serverFetch(`/books/${id}`);
}

export const manageBooks = async () => {
  return await serverFetch(`/manage-books`);
}

export const getFeaturedBook = async () => {
  return await serverFetch(`/featured-books`);
}