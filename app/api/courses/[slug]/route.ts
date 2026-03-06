import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const session = await getSession();

    const course = await prisma.course.findUnique({
        where: { slug },
        include: {
            lessons: { orderBy: { order: "asc" } },
            enrollments: session ? { where: { userId: session.userId } } : false,
        },
    });

    if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Get user's progress on these lessons
    let completedLessonIds: string[] = [];
    if (session) {
        const progress = await prisma.progress.findMany({
            where: {
                userId: session.userId,
                lessonId: { in: course.lessons.map((l) => l.id) },
            },
            select: { lessonId: true },
        });
        completedLessonIds = progress.map((p) => p.lessonId);
    }

    const totalLessons = course.lessons.length;
    const completedCount = completedLessonIds.length;
    const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return NextResponse.json({
        course: {
            id: course.id,
            slug: course.slug,
            title: course.title,
            description: course.description,
            category: course.category,
            level: course.level,
            duration: course.duration,
            students: course.students,
            rating: course.rating,
            isEnrolled: session ? course.enrollments.length > 0 : false,
            progress: progressPct,
            lessons: course.lessons.map((l) => ({
                id: l.id,
                title: l.title,
                order: l.order,
                duration: l.duration,
                completed: completedLessonIds.includes(l.id),
            })),
        },
    });
}
