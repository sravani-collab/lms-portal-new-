import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get courses user is enrolled in
export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json([], { status: 401 });

  const courses = await prisma.enrollment.findMany({
    where: { userId },
    include: { course: true },
  });

  return NextResponse.json(courses.map(e => e.course));
}

// Enroll in a course
export async function POST(req: Request) {
  const { userId, courseId } = await req.json();
  const enrollment = await prisma.enrollment.create({
    data: { userId, courseId },
  });
  return NextResponse.json(enrollment);
}
