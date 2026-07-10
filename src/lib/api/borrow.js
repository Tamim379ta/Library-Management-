"use server";

import { serverFetch } from "../core/server";

export const getBorrowedBooks = async () => {
  return await serverFetch('/borrows');
}