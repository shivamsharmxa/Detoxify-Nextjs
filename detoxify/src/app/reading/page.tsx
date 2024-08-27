'use client';
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import Articles from "../components/Articles";

function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "React",
    "Java",
    "Angular",
    "GET METHOD",
    "JavaScript",
  ];

  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update the value state
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setSearchQuery(inputValue); // Set the search query for articles
      console.log("submitted:", inputValue);
    }
  };

  return (
    <div className="h-auto min-h-screen flex flex-col justify-center items-center px-4 bg-gray-900">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-white">
        Dive Into Articles & Documentation
      </h2>

      {/* Input Component */}
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        value={inputValue} // Pass the value prop
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/* Articles Component */}
      <div className="w-full mt-16">
        {searchQuery && <Articles searchTerm={searchQuery} />}
      </div>
    </div>
  );
}

export default PlaceholdersAndVanishInputDemo;
