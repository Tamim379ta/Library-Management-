'use server';

import { serverFetch } from "../core/server";

export const getAllBooks = async () => {
  return await serverFetch('/books');
}