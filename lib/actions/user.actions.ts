"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "node-appwrite";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account, databases } = await createAdminClient();

    // Check if user exists
    const existingUsers = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", [email])]
    );

    if (!existingUsers.total) {
      const message = {
        status: "error",
        message: "Invalid user credentials",
      };

      return parseStringify(message);

      // return { error: "Invalid user credentials" };
    }

    // Try to create session
    let session;
    try {
      session = await account.createEmailPasswordSession(email, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      const message = {
        status: "error",
        message: "Invalid user credentials",
      };
      return parseStringify(message);
      // return { error: "Invalid user credentials" };
    }

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const message = {
      status: "success",
      message: "Login Successfully",
    };
    return parseStringify(message);
  } catch (error) {
    console.error("Error", error);

    const message = {
      status: "error",
      message:
        "An error occurred while signing in, make sure you are connected to internet",
    };

    return parseStringify(message);
  }
};

export const signUp = async ({ email, password, fullname }: SignUpParams) => {
  try {
    const { databases } = await createAdminClient();

    // Check if user already exists

    const existingUsers = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", [email])]
    );

    if (existingUsers.total > 0) {
      const message = {
        status: "error",
        message: "User already exists with this email",
      };

      return parseStringify(message);
    }

    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullname
    );

    if (!newUserAccount) {
      const message = {
        status: "error",
        message: "Error in creating user, please try again",
      };

      return parseStringify(message);
    }

    const userData = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        userId: newUserAccount.$id,
        email,
        fullname,
      }
    );

    if (!userData) throw new Error("Error sending user data to the database");

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const message = {
      status: "success",
      message: "User created successfully",
    };

    return parseStringify(message);
  } catch (error) {
    console.error("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const { databases } = await createAdminClient();
    const result = await account.get();
    const userInfo = parseStringify(result);

    const userId = userInfo.$id; // Your Appwrite user ID
    const userDocs = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("userId", userId)] // Assumes 'userId' is a field in your documents
    );

    if (userDocs.documents.length > 0) {
      const updatedUserInfo = {
        ...userInfo,
        username: userDocs.documents[0].username,
      };
      return parseStringify(updatedUserInfo);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updateUserName = async (username: string) => {
  const { databases } = await createAdminClient();

  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("User not logged in");

    const userId = user.$id; // Your Appwrite user ID

    // Step 1: Query to find the document where field 'userId' matches
    const userDocs = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("userId", userId)] // Assumes 'userId' is a field in your documents
    );

    if (userDocs.documents.length === 0) {
      throw new Error("User document not found");
    }

    // Assume one document per user; take the first
    const docId = userDocs.documents[0].$id;

    console.log("Found document ID:", docId, "for userId:", userId);

    // Step 2: Update the found document
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      docId, // Use the queried $id, not userId
      { username }
    );

    console.log("Updated user:", updatedUser);
    return parseStringify(updatedUser);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();
    // Redirect to sign-in page before destroying session
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }

    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");

    return { success: true };
  } catch (error) {
    console.error("Error during sign out", error);
    return { error: "Failed to sign out" };
  }
};

export interface StoreDataProps {
  ingredient: string;
  response: string | string[];
  shouldDelete: boolean;
  historyId?: string; // Optional history document ID for updating star field
}

export const storeStarred = async ({
  ingredient,
  response,
  shouldDelete,
  historyId,
}: StoreDataProps) => {
  const { databases } = await createAdminClient();
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("User not logged in");

    const userId = user.$id;

    if (shouldDelete) {
      const found = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.starredCollectionId,
        [
          Query.equal("ingredient", ingredient),
          Query.equal("response", response),
          Query.equal("userId", userId),
        ]
      );

      if (found.total === 0) {
        // Star: Create new starred document
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.starredCollectionId,
          ID.unique(),
          {
            userId,
            ingredient,
            response,
            responseId: ID.unique(),
          }
        );

        // Update history document star field to true if historyId provided
        if (historyId) {
          await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.historyCollectionId, // Assuming this is your history collection ID
            historyId,
            { star: true }
          );
        }

        console.log("starred message");
        return "Starred";
      }

      // Unstar: Delete existing starred documents
      for (const doc of found.documents) {
        await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.starredCollectionId,
          doc.$id
        );
      }

      // Update history document star field to false if historyId provided
      if (historyId) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.historyCollectionId, // Assuming this is your history collection ID
          historyId,
          { star: false }
        );
      }

      console.log("Deleted starred message(s)");
      return "Unstarred";
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getStarred = async () => {
  const { databases } = await createAdminClient();

  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("User not logged in");

    const userId = user.$id;
    const starred = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.starredCollectionId,
      [Query.equal("userId", userId), Query.orderDesc('$createdAt')]
    );

    return parseStringify(starred);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteStarredItem = async (responseId: string) => {
  const { databases } = await createAdminClient();

  console.log("Deleting starred item with responseId:", responseId);

  try {
    const documents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.starredCollectionId,
      [Query.equal("responseId", responseId)]
    );

    for (const doc of documents.documents) {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.starredCollectionId,
        doc.$id
      );
    }
    return { deleted: 1 };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const storeHistory = async ({
  ingredient,
  response,
}: StoreDataProps) => {
  const { databases } = await createAdminClient();
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("User not logged in");

    const userId = user.$id;
    // ✅ check if ingredient already exists
    const found = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.historyCollectionId,
      [Query.equal("ingredient", ingredient), Query.equal("userId", userId)]
    );

    if (found.total === 0) {
      console.log("Storing new history message");
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.historyCollectionId,
        ID.unique(),
        {
          userId,
          ingredient,
          response,
          responseId: ID.unique(),
        }
      );
      console.log("store history message");
      return;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getHistory = async () => {
  const { databases } = await createAdminClient();

  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("User not logged in");

    const userId = user.$id;
    const history = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.historyCollectionId,
      [Query.equal("userId", userId), Query.orderDesc('$createdAt')],
    );

    return parseStringify(history);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAllHistory = async () => {
  const { databases } = await createAdminClient();

  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("User not logged in");

    const userId = user.$id;

    const documents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.historyCollectionId,
      [Query.equal("userId", userId)]
    );

    for (const doc of documents.documents) {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.historyCollectionId,
        doc.$id
      );
    }
    console.log("Deleted all history");
    return { deleted: documents.documents.length };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteEachHistory = async (responseId: string) => {
  const { databases } = await createAdminClient();

  try {
    const documents = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.historyCollectionId,
      [Query.equal("responseId", responseId)]
    );

    for (const doc of documents.documents) {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.historyCollectionId,
        doc.$id
      );
    }
    return { deleted: 1 };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
