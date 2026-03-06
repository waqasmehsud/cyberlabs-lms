import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all enrollments with course + lesson progress info
    const enrollments = await prisma.enrollment.findMany({
        where: { userId: session.userId },
        include: {
            course: {
                include: {
                    lessons: { select: { id: true, title: true, order: true } },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    // Get all completed lessons for this user
    const allProgress = await prisma.progress.findMany({
        where: { userId: session.userId },
        select: { lessonId: true, completedAt: true },
        orderBy: { completedAt: "desc" },
    });

    const completedLessonIds = new Set(allProgress.map((p) => p.lessonId));

    // Build enrolled courses with progress
    const enrolledCourses = enrollments.map((e) => {
        const totalLessons = e.course.lessons.length;
        const completedInCourse = e.course.lessons.filter((l) =>
            completedLessonIds.has(l.id)
        ).length;
        const progressPct = totalLessons > 0
            ? Math.round((completedInCourse / totalLessons) * 100)
            : 0;

        // Find the last completed lesson or first lesson as "last lesson"
        const completedLessons = e.course.lessons
            .filter((l) => completedLessonIds.has(l.id))
            .sort((a, b) => b.order - a.order);

        const nextLesson = e.course.lessons
            .filter((l) => !completedLessonIds.has(l.id))
            .sort((a, b) => a.order - b.order)[0];

        const lastLesson = completedLessons[0] ?? e.course.lessons[0];

        return {
            slug: e.course.slug,
            title: e.course.title,
            category: e.course.category,
            progress: progressPct,
            totalLessons,
            completedLessons: completedInCourse,
            lastLesson: lastLesson ? `Lesson ${lastLesson.order}: ${lastLesson.title}` : "",
            nextLessonId: nextLesson?.id ?? null,
        };
    });

    // Stats
    const totalLabsCompleted = allProgress.length;
    const totalEnrolled = enrollments.length;

    // Recent activity (last 5 completions)
    const recentActivity = allProgress.slice(0, 5).map((p) => ({
        lessonId: p.lessonId,
        completedAt: p.completedAt,
    }));

    return NextResponse.json({
        user: { name: session.name, email: session.email },
        stats: {
            coursesEnrolled: totalEnrolled,
            labsCompleted: totalLabsCompleted,
            // Placeholder streak – would need a proper streak calculation in prod
            streak: Math.min(totalLabsCompleted, 14),
            hoursLearned: Math.round(totalLabsCompleted * 0.5),
        },
        enrolledCourses,
        recentActivity,
    });
}
