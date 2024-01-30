import React, { useEffect, useState } from 'react';
import Container from '../components/container/Container';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/auth';
import PostForm from '../post-form/PostForm';

const EditPost = () => {
  const [post, setPost] = useState(null)
  const {slug}=useParams()
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(slug){
      appwriteService.getPost(slug).them((post)=>{
        if(post){
          setPost(post)
        }else{
          navigate('/')
        }
      })
    }
  },[slug, navigate])
 return (
    <div className='py-6'>
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>
  );
}
export default EditPost;

