import config from "../config/config";
import { Client, Databases, Storage, Query,ID } from "appwrite";
export class Service{
  client = new Client();
  databases;
  bucket;
  constructor(){
    this.client
    .setEndpoint(config.appwriteURL)
    .setProject(config.appwriteProjectId);
    this.databases=new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async getPost(slug){
   try {
    return await this
    .databases
    .getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug)
   } catch (error) {
    console.log("Appwrite service :: getPost():: ", error);
    return false;
   }
  }
  async getPosts(querries = [Query.equal("status","active")]){
    try {
        return await this
        .databases
        .listDocuments(config.appwriteDatabaseId,config.appwriteCollectionId, querries)
    } catch (error) {
        console.log("Appwrite service :: getPosts() ::", error);
        return false;
    }
  }
  async createAccount({userId,featuredImage,status,title,slug,content }){
    try {
        return await this.databases.createDocument(config.appwriteDatabaseId, 
            config.appwriteCollectionId,slug, 
            {featuredImage,userId,status,title,content})
    } catch (error) {
      console.log("Appwrite service :: createAccount()::",error);  
      return false 
    }
  }
  async updatePost(slug,{title,content,featuredImage,status}){
    try {
        return await this
        .databases
        .updateDocument(config.appwriteDatabaseId,config.appwriteCollectionId,slug,
            {
            title,content,featuredImage,status
        })
    } catch (error) {
        console.log("Appwrite service :: updatePost()::",error);  
        return false
    }
  }
  async deletePost(slug){
    try {
        await this.databases.deleteDocument(config.appwriteDatabaseId, 
            config.appwriteCollectionId, slug)
            return true;
    } catch (error) {
        console.log("Appwrite service :: deletePost()::",error);  
        return false
        
    }
  }
  async uploadFile(file){
    try {
        return await this.bucket.createFile(config.appwriteBucketId,ID.unique(), file)
    } catch (error) {
        console.log("Appwrite service :: uploadFile()::", error);
    }
  }
  async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(config.appwriteBucketId, fileId)
    } catch (error) {
        console.log("Appwrite service :: deleteFile()::", error)
    }
  }
  getFilePreview(fieldId){
    return this.bucket.getFilePreview(
      config.appwriteBucketId,fieldId
    ).href

  }
}

const service = new Service()

export default service
