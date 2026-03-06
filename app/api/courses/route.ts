import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
    const session = await getSession();

    const courses = await prisma.course.findMany({
        orderBy: { students: "desc" },
        include: {
            _count: { select: { lessons: true } },
            enrollments: session
                ? { where: { userId: session.userId } }
                : false,
        },
    });

    const result = courses.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        category: c.category,
        level: c.level,
        duration: c.duration,
        students: c.students,
        rating: c.rating,
        lessonCount: c._count.lessons,
        isEnrolled: session ? c.enrollments.length > 0 : false,
    }));

    return NextResponse.json({ courses: result });
}
