'use server';

import { serverFetch, serverMutation } from "../core/server";

export const updateProfile = async (userId, profileData) => {
  return await serverMutation(`/users/${userId}`, profileData, 'PATCH');
}

export const getProfile = async (userId) => {
  return await serverFetch(`/users/${userId}`);
};

export const deleteUser = async (userId) => {
  return await serverMutation(`/users/${userId}`, {}, 'DELETE');
}