"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "node-appwrite";

//


export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { databases } = await createAdminClient();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error)
  }
}


//

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account  } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    // const session = await account.createEmailPasswordSession(email, password);

    // (await cookies()).set("appwrite-session", session.secret, {
    //   path: "/",
    //   httpOnly: true,
    //   sameSite: "strict",
    //   secure: true,
    // });

    // const user = await getUserInfo({ userId: session.userId }) 

    return parseStringify(response);
  } catch (error) {
    console.error('Error', error);
  }
}

//

export const signUp = async ({ email, password, fullname}: SignUpParams) => {
  
  
  // let newUserAccount;

  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(), 
      email, 
      password, 
      fullname,
       
    );

    // if(!newUserAccount) throw new Error('Error creating user')

    // const newUser = await databases.createDocument(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.usersCollectionId,
    //   ID.unique(),
    //   {
    //     ...userData,
    //     userId: newUserAccount.$id,
    //     dwollaCustomerId,
    //     dwollaCustomerUrl
    //   }
    // )

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error('Error', error);
  }
}


//

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    // const user = await getUserInfo({ userId: result.$id})

    return parseStringify(result);
  } catch (error) {
    console.log(error)
    return null;
  }
}



