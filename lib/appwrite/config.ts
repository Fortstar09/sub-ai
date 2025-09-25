  
  if (
    !process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    !process.env.NEXT_PUBLIC_APPWRITE_PROJECT ||
    !process.env.NEXT_PUBLIC_APPWRITE_DATABASE ||
    !process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION ||
    !process.env.NEXT_PUBLIC_APPWRITE_STARRED_COLLECTION ||
    !process.env.NEXT_APPWRITE_KEY
  ) {
    throw new Error("Missing required environment variables for Appwrite configuration.");
  }

  export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
    starredCollectionId: process.env.NEXT_PUBLIC_APPWRITE_STARRED_COLLECTION!,

    secretKey: process.env.NEXT_APPWRITE_KEY!,
  };