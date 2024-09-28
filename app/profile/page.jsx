"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {useState, useEffect} from "react"
import Profile from "@components/Profile"


const MyProfile = () => {

    const [posts, setPosts] = useState([])
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(()=>{
        const fetchPosts = async ()=>{
          try {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data)  
          } catch (error) {
            console.log(error)  
          }
          
        }
        
        if(session?.user.id)
        {
            fetchPosts();
        }
      },[])

    const handleEdit = (post)=>{
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post)=>{
        const hasConfirmed = confirm("Are you sure you want to delete this post?")

        if(hasConfirmed)
        {
            
          try {
            const response =  await fetch(`/api/prompt/${post._id.toString()}`, {
              method:"DELETE",
            })

              const filteredPosts = posts.filter((item)=> item._id !== post._id)
              setPosts(filteredPosts);
          } catch (error) {
            console.log(error)
          }
            }
    }

return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
    />
  )
}

export default MyProfile