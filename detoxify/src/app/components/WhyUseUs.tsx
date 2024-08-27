"use client";
import React from "react";
import { StickyScroll } from "../../app/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const musicSchoolContent = [
    
    {
        title: 'Boost Your Productivity with Detoxify',
        description:
            'Maximize your focus and efficiency with Detoxify. Our app helps you stay on track by minimizing distractions and tailoring content to your study needs, ensuring you make the most out of your study sessions.',
    },
    {
        title: 'Personalized Learning Experience',
        description:
            'Detoxify adapts to your unique learning preferences and interests. With customized recommendations and an intuitive search feature, you can easily access relevant study materials and keep your learning journey efficient and engaging.',
    },
    {
        title: 'Stay Updated with the Latest Resources',
        description:
            'Access a wealth of up-to-date educational content with Detoxify. Our app constantly updates its resource library, ensuring you have the most current information and tools to support your academic growth.',
    },
    {
        title: 'Minimize Distractions and Enhance Focus',
        description:
            'With Detoxify’s intelligent content curation, you can focus on what matters most. Our app filters out distractions and keeps you engaged with only the most relevant and helpful study materials.',
    },
    {
        title: 'Effortless Integration into Your Study Routine',
        description:
            'Detoxify seamlessly integrates with your existing study habits. Whether you’re preparing for exams or exploring new topics, our app fits effortlessly into your schedule, making productivity and learning more accessible.',
    },
    {
        title: 'Track Your Progress and Achievements',
        description:
            'Monitor your learning progress with Detoxify’s intuitive tracking features. Keep an eye on your achievements and milestones, ensuring that you stay motivated and on track toward your academic goals.',
    },
    {
      title: 'Cutting-Edge Curriculum',
      description:
        'Our curriculum is continuously updated to include the latest music education trends and technologies, ensuring you’re always learning with the most current and effective methods. Say goodbye to outdated materials and welcome an education that evolves with the industry.',
    },
    {
      title: 'Limitless Learning Opportunities',
      description:
        'With our expansive resource library and dynamic course offerings, you’ll never find yourself without something new to explore. Our platform provides continuous opportunities for growth, ensuring your musical skills are always advancing.',
    },
  ];


function WhyChooseUS() {
  return (
    <div>
        <StickyScroll content={musicSchoolContent} />
    </div>
  )
}

export default WhyChooseUS