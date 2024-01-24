import config from "../config/config";
import { Client, Databases, Storage, Query } from "appwrite";

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
        await this.databases.createDocument(config.appwriteDatabaseId, 
            config.appwriteCollectionId,slug, 
            {featuredImage,userId,status,title,content})
    } catch (error) {
      console.log("Appwrite service :: createAccount()::",error);  
    }
  }
}
