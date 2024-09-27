"use client"

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({data, handleTagClick }) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post)=> (
        <PromptCard 
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}


const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])

  const handleSearchChange = (e) => {
    e.preventDefault();
    
    setSearchText(e.target.value)
    let data = e.target.value;

    const filterData = posts.filter(
      (post)=> post.prompt.toLowerCase().includes(data.toLowerCase() || searchText.toLowerCase()) ||
      post.tag.toLowerCase().includes(data.toLowerCase() || searchText.toLowerCase()) || 
      post.creator.username.toLowerCase().includes(data.toLowerCase() || searchText.toLowerCase())
    )

    setFilteredPosts(filterData)
  }

  const handleTagClick = (tag)=>{
      setSearchText(tag);
      const filterData = posts.filter(
        (post)=> post.prompt.toLowerCase().includes(tag.toLowerCase()) ||
        post.tag.toLowerCase().includes(tag.toLowerCase()) || 
        post.creator.username.toLowerCase().includes(tag.toLowerCase())
      )
  
      setFilteredPosts(filterData)
  }

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data)
    }

    fetchPosts();
  },[])

  return(
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchText ? filteredPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  ) 
};

export default Feed;
