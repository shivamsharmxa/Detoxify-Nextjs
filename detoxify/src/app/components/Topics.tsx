"use client"
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer } from "./ui/3d-card";
import Link from "next/link";
import courses from '../data/Topics_data.json';

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  image: string;
}

export function Topics() {
  const topics: Course[] = courses.courses.filter((course: Course) => course.isFeatured);
  console.log(topics); // Debug filtered topics

  return (
    <div className="py-12 bg-gray-900">
      <div className="text-center mb-8">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">FEATURED TOPICS</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Learn With the Best</p>
      </div>
      <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {topics.map((topic: Course) => (
          <CardContainer key={topic.id} className="flex justify-center">
            <CardBody className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
              <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{topic.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{topic.description}</p>
                <Link
                  href={`/courses/${topic.slug}`}
                  className="mt-4 px-4 py-2 rounded-lg text-xs font-normal text-white bg-teal-600 hover:bg-teal-700 transition duration-200">
                  Learn More →
                </Link>
              </div>
              <div className="relative w-full h-60">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-b-lg"
                />
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
      <div className="mt-20 text-center">
        
      </div>
    </div>
  );
}
