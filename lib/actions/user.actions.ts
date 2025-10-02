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
    const result = await account.get();
    const userInfo = parseStringify(result);

    return userInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
}

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

export const storeStarred = async ({
  ingredient,
  response,
  shouldDelete,
}: StoreDataProps) => {
  const { databases } = await createAdminClient();
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("User not logged in");

    const userId = user.$id;

    if (shouldDelete) {
      // ✅ Delete logic
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

        console.log("starred message");
        return "Starred";
      }

      for (const doc of found.documents) {
        await databases.deleteDocument(
          appwriteConfig.databaseId,
          appwriteConfig.starredCollectionId,
          doc.$id
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
      [Query.equal("userId", userId)]
    );

    return parseStringify(starred);
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
      [Query.equal("ingredient", ingredient)]
    );

    if (found.total === 0) {
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
      return ;
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
      [Query.equal("userId", userId)]
    );

    return parseStringify(history);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// StoreStarred({
//   ingredient: "ingredient",
//   response: ["strore", "here", "place", "job"],
// });
