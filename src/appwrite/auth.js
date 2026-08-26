import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;
    isConfigured = false;

    constructor() {
        this.isConfigured = Boolean(conf.appwriteUrl && conf.appwriteProjectId);

        if (!this.isConfigured) {
            console.warn('Appwrite is not configured. Add VITE_APPWRITE_URL and VITE_APPWRITE_PROJECT_ID to your .env file.');
            return;
        }

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        if (!this.isConfigured) return null;

        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if (userAccount) {
            return this.login({email, password});
        }
        return userAccount;
    }

    async login({email, password}) {
        if (!this.isConfigured) return null;
        try {
            // Use the SDK method that accepts email + password.
            // In this SDK build the function is named createEmailPasswordSession.
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.warn('Appwrite auth :: login error', error);
            throw error;
        }
    }

    async getCurrentUser() {
        if (!this.isConfigured) return null;

        try {
            return await this.account.get();
        } catch (error) {
            if (error && error.code === 401) {
                return null;
            }
            console.warn('Appwrite service :: getCurrentUser :: error', error);
            return null;
        }
    }

    async logout() {
        if (!this.isConfigured) return;
        await this.account.deleteSessions();
    }
}

const authService = new AuthService();

export default authService

