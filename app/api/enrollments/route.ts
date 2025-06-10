// app/api/enrollment/check/route.ts
import { auth } from "@clerk/nextjs"; // or use your auth logic
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { courseId } = await req.json();
  const { userId } = auth();

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const enrollment = await prisma.courseEnrollment.findFirst({
    where: { courseId, userId },
  });

  return NextResponse.json({ enrolled: !!enrollment });
}
