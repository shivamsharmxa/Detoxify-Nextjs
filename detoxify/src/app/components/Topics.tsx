
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
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

  return (
    <CardContainer className="py-12 bg-gray-900">
      <div>
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">FEATURED COURSES</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Learn With the Best</p>
        </div>
      </div>
      <div className="mt-10 mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {topics.map((topic: Course) => (
          <CardBody
            key={topic.id}
            className="bg-white dark:bg-zinc-900 rounded-[22px] overflow-hidden max-w-sm"
          >
            <div className="p-4 sm:p-6 flex flex-col items-center text-center">
              <h3 className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{topic.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">{topic.description}</p>
              <Link href={`/courses/${topic.slug}`}>
                <a className="mt-4 px-4 py-2 rounded-xl text-xs font-normal text-white bg-teal-600 hover:bg-teal-700 transition duration-200">Learn More →</a>
              </Link>
            </div>
            <div className="relative">
              <Image
                src={topic.image}
                alt={topic.title}
                layout="responsive"
                width={1000}
                height={600}
                className="object-cover"
              />
            </div>
          </CardBody>
        ))}
      </div>
      <div className="mt-20 text-center">
        <Link href={"/courses"} passHref>
          <a className="px-4 py-2 rounded border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200">View All Courses</a>
        </Link>
      </div>
    </CardContainer>
  );
}

