import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jatin.aurora",
    projectId: "67028819003d5b349e5b",
    databaseId: "67028968003597ccd1e4",
    userCollectionId: "670289990035383c7d58",
    videoCollectionId: "670289ce00012f53a770",
    storageId: "67029545002c381d14f3",
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) {
            throw new Error('Failed to create user')
        }

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if(!currentAccount) {
            throw new Error('Failed to get current user')
        }

        const user = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [
                Query.equal('accountId', currentAccount.$id)
            ]
        )

        if(!user) {
            throw new Error('Failed to get current user')
        }

        return user.documents[0]
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}
