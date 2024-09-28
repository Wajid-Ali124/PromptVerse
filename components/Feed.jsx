"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [error, setError] = useState(false); // Track error state

  const handleSearchChange = (e) => {
    e.preventDefault();

    setSearchText(e.target.value);
    let data = e.target.value;

    const filterData = posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(data.toLowerCase() || searchText.toLowerCase()) ||
        post.tag.toLowerCase().includes(data.toLowerCase() || searchText.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(data.toLowerCase() || searchText.toLowerCase())
    );

    setFilteredPosts(filterData);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const filterData = posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(tag.toLowerCase()) ||
        post.tag.toLowerCase().includes(tag.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(tag.toLowerCase())
    );

    setFilteredPosts(filterData);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        if (!response.ok) {
          throw new Error("Failed to fetch data"); // Handle non-200 responses
        }
        const data = await response.json();
        setPosts(data);
        setError(false); // Clear error if successful
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
        setTimeout(fetchPosts, 3000); // Retry after 3 seconds
      }
    };

    fetchPosts(); // Initial fetch
  }, []); // Empty dependency array ensures this runs only once

  return (
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

      {error && <p className="error-message">Failed to load posts, retrying...</p>} {/* Optional error message */}

      <PromptCardList data={searchText ? filteredPosts : posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
