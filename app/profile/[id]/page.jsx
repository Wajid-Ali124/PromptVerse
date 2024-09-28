"use client"

import { useSearchParams } from "next/navigation"
import {useState, useEffect} from "react"
import Profile from "@components/Profile"


const UserProfile = ({params}) => {

    const [posts, setPosts] = useState([])
    const searchParams = useSearchParams()
    const name = searchParams.get('name');

    useEffect(()=>{
        const fetchPosts = async ()=>{
          try {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();
            setPosts(data)  
          } catch (error) {
            console.log(error)
          }
        }
        
        if(params.id)
        {
            fetchPosts();
        }
      },[])

return (
    <Profile 
        name={name}
        desc={`Check out Prompts created by ${name}`}
        data={posts}
    />
  )
}

export default UserProfile