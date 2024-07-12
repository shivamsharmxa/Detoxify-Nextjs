'use client'
import { FC } from 'react';
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { PlaceholdersAndVanishInput } from '@/app/components/ui/placeholders-and-vanish-input';
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const words = [
  {
    text: "Focus",
  },
  {
    text: "On",
  },
  {
    text: "Goals",
  },
  {
    text: "with",
  },
  {
    text: "Detoxify.",
    className: "text-blue-500 dark:text-blue-500",
  },
];

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const placeholders = [
    "How to learn React?",
    "How to be productive?",
    "Error handling in TypeScript?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget?.query?.value;
    if (query) {
      console.log('Submitted query:', query);
      onSearch(query);
    } else {
      console.error('Query value is undefined or null');
    }
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      <LampContainer>
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
       <TypewriterEffectSmooth words={words} />
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      </LampContainer>
    </div>
  );
};

export default SearchBar;
