import React, { useCallback, useEffect } from 'react';
import useForm from 'react-hook-form'
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import RTE from '../components/Header/RTE'; 
import appwriteService from '../appwrite/database';
import { UseSelector, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    const submit = async(data)=>{}
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
            accept="image/jpeg,image/jpg,image/png" {...register("image",{required: true})}/>
            {post && (
                <div className='w-full mb-4'>
                    <img src={appwriteService.getFilePreview(post.featuredImage)} alt=""/>
                </div>
            )}
        </div>
    </form>
  );
}

export default PostForm;
