'use server';

import { serverFetch } from "../core/server";

export const getAllUser = async () => {
  return await serverFetch('/users');
}