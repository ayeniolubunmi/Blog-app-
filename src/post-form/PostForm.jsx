import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import Select from './Select';
import RTE from '../components/Header/RTE'; 
import appwriteService from '../appwrite/database';
import { UseSelector, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from './Input'

const PostForm = ({post}) => {
    const {register,handleSubmit,setValue,getValues,watch,control} = useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.slug || "",
            content:post?.content || "",
            status:post?.status || "active",
        }
    })
    const navigate = useNavigate();
    const userData = useSelector((state)=>state.auth.userData);
    const submit = async(data)=>{
        if(post){
            const file = data.image[0] ? 
            await appwriteService.uploadFile(data.image[0]):null
            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id,
                {...data, featuredImage: file ? file.$id : undefined})
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
        }else{
            const file = await appwriteService.uploadFile(data.image[0])
            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await 
                appwriteService.createPost({...data, userId:userData.$id})
                if(dbPost){
                    navigate(`/post/dbPost.$id`)
                }
            }

        }
    }
    const slugTransform = useCallback((value)=>{
        if(value && typeof value === "string") return value.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g,'-').replace(/\s/g, "-")
    },[])
    
    useEffect(()=>{
        watch((value, {name})=>{
            if(name === "title"){
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
        })
    },[watch, slugTransform,setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
        <div className='w-2/3 px-2'>
        <Input 
            label="Title" 
            placeholder="Title" 
            className="mb-4" {...register("title", {required: true})}
        />
        <Input label="slug" placeholder="slug" className="mb-4"
         {...register("slug", {required: true})} 
         onInput={(e)=>{
            setValue("slug", slugTransform(e.currentTraget.value), {shouldValidate: true})
         }} />
         <RTE 
         label="Content" 
         name="content" 
         control={control} 
         defaultValue={getValues("content")}/>
        </div>
        <div className='1/3 pcx-2'>
            <Input label="Featured Image" 
            type="file" 
            className="mb-4" 
            accept="image/jpeg,image/jpg,image/png"{...register("image",
            {required: !post})}/>
            {post && (
                <div className='w-full mb-4'>
                    <img src={appwriteService.getFilePreview(post.featuredImage)} 
                    alt={post.title} className='rounded-lg'/>
                </div>
            )}
            <Select 
            options={["active","inactive"]} 
            label="Status" 
            className="mb-4" 
            {...register("status", {required:true})} />
            <Button className='w-full' type='submit' bgColor={post?"bg-green-500":undefined}>
                {post ? "Update":"Submit"}
            </Button>
        </div>
    </form>
  );
}
export default PostForm;
