import React from 'react';
import Container from '../components/container/Container';
import appwriteService from '../config/config';
import { useState, useEffect } from 'react';
import PostCard from './PostCard';

const Home = () => {
  const [posts, setPosts]=useState(null);

  useEffect(()=>{
    appwriteService.getPosts([]).then((posts)=>{
      if(posts){
        setPosts(posts)
      }
    })
  },[])
  if(posts.lenght === 0){
    return(
      <div className='flex flex-wrap'>
          <h1>Login to read posts </h1>
      </div>
    )
  }
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post)=>(
            <div className='p-2 w-1/2' key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container> 
    </div>
  );
}

export default Home;
