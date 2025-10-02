"use server";

import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUser = async () => {
  return await currentUser();
};