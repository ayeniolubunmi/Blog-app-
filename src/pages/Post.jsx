import React, { useState,useEffect } from 'react';
import { UseSelector, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate,Link } from 'react-router-dom';
import authService from '../appwrite/auth';
import appwriteSerivice from '../appwrite/auth'
import Button from '../post-form/Button';
import parse from 'html-react-parser';
import Container from '../components/container/Container'

const Post = () => {
  const [post, setPost ]= useState(null)
  const {slug}=useParams();
  const navigate = useNavigate();
  const userData = useSelector((state)=>state.auth.userData)

  const isAuth = post && userData ? post.userId === userData.$id : false
  useEffect(()=>{
   if(slug){
    appwriteSerivice.getPost(slug).then((post)=>{
      if(post){
        setPost(post)
      }else{
        navigate("/")
      }
    })
   }
  },[slug,navigate])
  const deletePost = ()=>{
   appwriteSerivice.deletePost(post.$id).then((status)=>{
    appwriteSerivice.deleteFile(post.featuredImage)
    navigate('/')
   })
  }
  return post ? (
    <div className='py-8'>
      <Container>
        <div className='w-full justify-center flex relative border rounded-xl mb-4 p-2'>
          <img src={appwriteSerivice.getFilePreview(post.featuredImage)} 
          alt={post.title} className='rounded-xl' />
          {isAuth && (
            <div className="absolute-right-6 top-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor='bg-green-300' className='mr-3'> Edit </Button>
              </Link>
              <Button onClick={deletePost} bgColor='bg-green-300'> Delete </Button>
            </div>
          )}
        </div>
        <div className='w-full mb-6'>
          <h1 className='text-2xl font-bold'>{post.title}</h1>
        </div>
        <div className='browse-css'>
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ):null
}

export default Post;
