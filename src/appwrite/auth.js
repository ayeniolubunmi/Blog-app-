import config from "../config/config";
import { Client, Account, ID } from "appwrite";
export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId);
        this.account=new Account(this.client);
    }
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password,name)
            if(userAccount){
                return await this.login({email, password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email, password}){
        try {
            return this.account.createEmailSession(email,password)
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
           throw error 
        }
    }
    async logOut(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite servcie :: logout()::",error)
        }
    }
}

const authService = new AuthService()

export default authService;