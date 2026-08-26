import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    isConfigured = false;
    
    constructor(){
        this.isConfigured = Boolean(
            conf.appwriteUrl &&
            conf.appwriteProjectId &&
            conf.appwriteDatabaseId &&
            conf.appwriteCollectionId &&
            conf.appwriteBucketId
        );

        if (!this.isConfigured) {
            console.warn('Appwrite is not configured. Add your VITE_APPWRITE_* values to your .env file.');
            return;
        }

        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    normalizeImageValue(value) {
        if (!value || typeof value !== 'string') return '';
        const imageValue = value.trim();
        if (!imageValue) return '';
        if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) return imageValue;
        return imageValue;
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        if (!this.isConfigured) return null;

        try {
            const created = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    // backend schema expects featuredImg; include it from featuredImage
                    featuredImg: featuredImage,
                    status,
                    userId,
                }
            )
            // normalize returned document for client: map featuredImg -> featuredImage
            if (created && created.documents === undefined) {
                created.featuredImage = this.normalizeImageValue(created.featuredImg || created.featuredImage);
            }
            return created;
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
            return null;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        if (!this.isConfigured) return null;

        try {
            const updated = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    // backend expects featuredImg
                    featuredImg: featuredImage,
                    status,
                }
            )
            if (updated) {
                updated.featuredImage = this.normalizeImageValue(updated.featuredImg || updated.featuredImage);
            }
            return updated;
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
            return null;
        }
    }

    async deletePost(slug){
        if (!this.isConfigured) return false;

        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
             
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        if (!this.isConfigured) return false;

        try {
            const doc = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            if (doc) {
                doc.featuredImage = this.normalizeImageValue(doc.featuredImg || doc.featuredImage);
            }
            return doc;
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        if (!this.isConfigured) return false;

        try {
            const res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
            // normalize documents to use featuredImage in client
            if (res && Array.isArray(res.documents)) {
                res.documents = res.documents.map((d) => ({
                    ...d,
                    featuredImage: this.normalizeImageValue(d.featuredImg || d.featuredImage),
                }));
            }
            return res;
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async uploadFile(file){
        if (!this.isConfigured) return false;

        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        if (!this.isConfigured) return false;

        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        const imageValue = this.normalizeImageValue(fileId);
        if (!this.isConfigured || !imageValue) return '';

        if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) {
            return imageValue;
        }

        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                imageValue
            );
        } catch (error) {
            console.warn('Appwrite preview failed for file:', imageValue, error);
            return '';
        }
    }
}


const service = new Service()
export default service