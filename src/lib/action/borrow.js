'use server';

import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";


export const borrowBook = async (bookId, title) => {
  const user = await getUserSession();
  const userId = user?.id;
 
  return await serverMutation('/borrows', { bookId , userId, title });
}
export const returnBook = async (borrowId) => {
  return await serverMutation(`/borrows/${borrowId}/return`, {}, 'PATCH');
};
export const deleteBorrow = async (borrowId) => {
  return await serverMutation(`/borrows/${borrowId}`, {}, 'DELETE');
}