import { NextResponse } from 'next/server';

const enrolledCourses = [
  {
    id: '967faf58-fbcc-41c0-8c26-7de947747a53',
    title: 'Introduction to Computer Networks',
    description: 'Learn the basics of networking.',
    createdAt: '2025-06-04T10:30:57.155Z',
    modules: [
      {
        id: '776ff041-a46d-45c8-a815-5911e11206ba',
        title: 'Module 1: Introduction',
        courseId: '967faf58-fbcc-41c0-8c26-7de947747a53',
        lessons: [
          {
            id: 'db42c891-40c3-40c7-ae24-6222fe36b821',
            title: 'Lesson 1.1: Overview',
            moduleId: '776ff041-a46d-45c8-a815-5911e11206ba',
          },
          {
            id: '61b85c52-52d3-4e89-82e6-b8842848a873',
            title: 'Lesson 1.2: Basics',
            moduleId: '776ff041-a46d-45c8-a815-5911e11206ba',
          },
        ],
      },
      {
        id: '460d7978-a6dd-4df1-a83a-587a17388ab3',
        title: 'Module 2: OSI Models',
        courseId: '967faf58-fbcc-41c0-8c26-7de947747a53',
        lessons: [
          {
            id: '551768e5-44b7-4b8a-94e2-9a0542d70627',
            title: 'Lesson 2.1: Layers',
            moduleId: '460d7978-a6dd-4df1-a83a-587a17388ab3',
          },
        ],
      },
    ],
  },
];

const exploreCourses = [
  {
    id: 'a12bc345-d678-90ef-1234-56789abcdef0',
    title: 'React for Beginners',
    description: 'Learn React from scratch.',
    createdAt: '2025-06-01T12:00:00.000Z',
    modules: [],
  },
  // Add more explore courses as needed
];

export async function GET() {
  // Return both enrolled and explore courses
  return NextResponse.json({
    enrolledCourses,
    exploreCourses,
  });
}
