import React from 'react';
import Container from '../components/container/Container';
import { useEffect,useState } from 'react';
import appwriteService from '../config/config'
import PostCard from './PostCard'

const AllPosts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(()=>{
    appwriteService.getPosts([]).then((posts)=>{
      if(posts){
        setPosts(posts)
      }else{

      }
    })
  },[])
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post)=>(
            <div className='p-2 w-1/2' key={post}>
              <PostCard />
            </div>
          ))}
        </div>
      </Container> 
    </div>
  );
}

export default AllPosts;
