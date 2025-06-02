import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get all courses
export async function GET() {
  const courses = await prisma.course.findMany();
  return NextResponse.json(courses);
}

// Create a course
export async function POST(req: Request) {
  const body = await req.json();
  const course = await prisma.course.create({ data: body });
  return NextResponse.json(course);
}
