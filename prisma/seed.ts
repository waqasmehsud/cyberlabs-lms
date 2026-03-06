import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const courses = [
    {
        slug: "web-app-hacking",
        title: "Web Application Hacking",
        description: "Master OWASP Top 10, SQL injection, XSS, CSRF, and advanced web exploitation using real-world vulnerable apps.",
        category: "Web Security",
        level: "Intermediate",
        duration: "24h",
        students: 3200,
        rating: 4.9,
        lessons: [
            { title: "Introduction to Web Security", order: 1, duration: "12m" },
            { title: "HTTP & HTTPS Deep Dive", order: 2, duration: "18m" },
            { title: "OWASP Top 10 Overview", order: 3, duration: "22m" },
            { title: "SQL Injection Fundamentals", order: 4, duration: "35m" },
            { title: "Advanced SQL Injection", order: 5, duration: "40m" },
            { title: "Cross-Site Scripting (XSS)", order: 6, duration: "30m" },
            { title: "Stored vs Reflected XSS", order: 7, duration: "25m" },
            { title: "Cross-Site Request Forgery", order: 8, duration: "20m" },
            { title: "Broken Authentication", order: 9, duration: "28m" },
            { title: "Insecure Direct Object References", order: 10, duration: "22m" },
            { title: "Security Misconfigurations", order: 11, duration: "18m" },
            { title: "Sensitive Data Exposure", order: 12, duration: "24m" },
            { title: "XML External Entities (XXE)", order: 13, duration: "20m" },
            { title: "Server-Side Request Forgery", order: 14, duration: "32m" },
            { title: "Final Lab: HackTheBox Walkthrough", order: 15, duration: "60m" },
        ],
    },
    {
        slug: "network-intrusion",
        title: "Network Intrusion Detection",
        description: "Learn to detect and respond to network attacks using Wireshark, Suricata, Snort, and custom IDS rules.",
        category: "Network",
        level: "Advanced",
        duration: "32h",
        students: 1800,
        rating: 4.8,
        lessons: [
            { title: "Networking Fundamentals Review", order: 1, duration: "20m" },
            { title: "Packet Analysis with Wireshark", order: 2, duration: "45m" },
            { title: "TCP/IP Attack Patterns", order: 3, duration: "30m" },
            { title: "Introduction to Snort", order: 4, duration: "25m" },
            { title: "Writing Snort Rules", order: 5, duration: "40m" },
            { title: "Suricata Setup & Config", order: 6, duration: "35m" },
            { title: "Network Anomaly Detection", order: 7, duration: "28m" },
            { title: "SIEM Integration", order: 8, duration: "30m" },
            { title: "Incident Response Workflows", order: 9, duration: "45m" },
            { title: "Lab: Real Attack Pcap Analysis", order: 10, duration: "60m" },
        ],
    },
    {
        slug: "malware-fundamentals",
        title: "Malware Analysis Fundamentals",
        description: "Reverse-engineer and analyze Windows malware using static and dynamic analysis techniques with IDA Pro.",
        category: "Malware",
        level: "Beginner",
        duration: "18h",
        students: 5100,
        rating: 4.7,
        lessons: [
            { title: "What is Malware?", order: 1, duration: "10m" },
            { title: "Types of Malware", order: 2, duration: "15m" },
            { title: "Setting Up a Safe Lab", order: 3, duration: "20m" },
            { title: "Static Analysis Basics", order: 4, duration: "30m" },
            { title: "PE File Structure", order: 5, duration: "25m" },
            { title: "Dynamic Analysis with ProcMon", order: 6, duration: "35m" },
            { title: "Introduction to IDA Pro", order: 7, duration: "40m" },
            { title: "x86 Assembly for Malware Analysts", order: 8, duration: "45m" },
            { title: "Analyzing a Real Trojan Sample", order: 9, duration: "50m" },
            { title: "Anti-Analysis Techniques", order: 10, duration: "30m" },
            { title: "Sandbox Evasion Detection", order: 11, duration: "28m" },
            { title: "Final Report Writing", order: 12, duration: "20m" },
        ],
    },
    {
        slug: "crypto-pki",
        title: "Cryptography & PKI Deep Dive",
        description: "Deep dive into symmetric/asymmetric encryption, PKI infrastructure, TLS internals, and common crypto attacks.",
        category: "Cryptography",
        level: "Advanced",
        duration: "28h",
        students: 2400,
        rating: 4.9,
        lessons: [
            { title: "Cryptography Foundations", order: 1, duration: "20m" },
            { title: "Symmetric Encryption (AES, DES)", order: 2, duration: "35m" },
            { title: "Asymmetric Encryption (RSA, ECC)", order: 3, duration: "40m" },
            { title: "Hashing Algorithms", order: 4, duration: "25m" },
            { title: "Digital Signatures", order: 5, duration: "30m" },
            { title: "TLS Protocol Internals", order: 6, duration: "45m" },
            { title: "PKI & Certificate Authority", order: 7, duration: "35m" },
            { title: "Common Crypto Attacks", order: 8, duration: "40m" },
            { title: "Padding Oracle Attack Lab", order: 9, duration: "50m" },
            { title: "Post-Quantum Cryptography", order: 10, duration: "25m" },
        ],
    },
    {
        slug: "bug-bounty",
        title: "Bug Bounty Hunting Mastery",
        description: "Learn how to find and report vulnerabilities on HackerOne and Bugcrowd platforms for real financial rewards.",
        category: "Web Security",
        level: "Intermediate",
        duration: "20h",
        students: 4200,
        rating: 4.8,
        lessons: [
            { title: "Bug Bounty Platform Overview", order: 1, duration: "15m" },
            { title: "Scope and Rules of Engagement", order: 2, duration: "20m" },
            { title: "Recon and Subdomain Enumeration", order: 3, duration: "35m" },
            { title: "Finding XSS in the Wild", order: 4, duration: "40m" },
            { title: "IDOR and Business Logic Bugs", order: 5, duration: "35m" },
            { title: "Writing a Quality Report", order: 6, duration: "25m" },
            { title: "Getting Paid & Tax Considerations", order: 7, duration: "20m" },
            { title: "Interview: $100k Hunter Tips", order: 8, duration: "30m" },
        ],
    },
    {
        slug: "digital-forensics",
        title: "Digital Forensics & IR",
        description: "Gain hands-on experience in incident response, memory forensics, disk imaging, and chain-of-custody procedures.",
        category: "Forensics",
        level: "Intermediate",
        duration: "26h",
        students: 2100,
        rating: 4.7,
        lessons: [
            { title: "Intro to Digital Forensics", order: 1, duration: "15m" },
            { title: "Evidence Collection & Chain of Custody", order: 2, duration: "25m" },
            { title: "Disk Imaging with dd & FTK Imager", order: 3, duration: "35m" },
            { title: "File System Analysis", order: 4, duration: "30m" },
            { title: "Windows Registry Forensics", order: 5, duration: "40m" },
            { title: "Memory Forensics with Volatility", order: 6, duration: "45m" },
            { title: "Log Analysis & Correlation", order: 7, duration: "35m" },
            { title: "Incident Response Playbook", order: 8, duration: "30m" },
            { title: "Malware IR Case Study", order: 9, duration: "50m" },
        ],
    },
    {
        slug: "active-directory",
        title: "Active Directory Attacks",
        description: "Compromise Windows domains using Kerberoasting, Pass-the-Hash, BloodHound, and lateral movement techniques.",
        category: "Pentesting",
        level: "Advanced",
        duration: "36h",
        students: 3400,
        rating: 4.9,
        lessons: [
            { title: "Active Directory Fundamentals", order: 1, duration: "25m" },
            { title: "Enumeration with BloodHound", order: 2, duration: "40m" },
            { title: "Kerberoasting Attack", order: 3, duration: "35m" },
            { title: "Pass-the-Hash & Pass-the-Ticket", order: 4, duration: "40m" },
            { title: "DCSync Attack", order: 5, duration: "30m" },
            { title: "Lateral Movement with PSExec", order: 6, duration: "35m" },
            { title: "Privilege Escalation", order: 7, duration: "45m" },
            { title: "Golden & Silver Tickets", order: 8, duration: "40m" },
            { title: "Defense & Detection", order: 9, duration: "30m" },
            { title: "Full Lab: Compromise a Domain", order: 10, duration: "90m" },
        ],
    },
    {
        slug: "cloud-security",
        title: "Cloud Security Fundamentals",
        description: "Identify and exploit misconfigurations in AWS, Azure, and GCP environments — plus cloud-native defenses.",
        category: "Network",
        level: "Intermediate",
        duration: "22h",
        students: 2900,
        rating: 4.6,
        lessons: [
            { title: "Cloud Security Shared Responsibility", order: 1, duration: "15m" },
            { title: "AWS IAM & Privilege Escalation", order: 2, duration: "40m" },
            { title: "S3 Bucket Misconfigurations", order: 3, duration: "30m" },
            { title: "Azure Security Center", order: 4, duration: "35m" },
            { title: "GCP Security Command Center", order: 5, duration: "30m" },
            { title: "Container & Kubernetes Security", order: 6, duration: "45m" },
            { title: "Serverless Security Risks", order: 7, duration: "25m" },
            { title: "Cloud Forensics", order: 8, duration: "30m" },
        ],
    },
    {
        slug: "ctf-basics",
        title: "CTF Starter Pack",
        description: "Start competing in Capture the Flag competitions with guided walkthroughs of rev, crypto, pwn, and web challenges.",
        category: "CTF",
        level: "Beginner",
        duration: "12h",
        students: 6800,
        rating: 4.8,
        lessons: [
            { title: "What is a CTF?", order: 1, duration: "10m" },
            { title: "Web Challenge Walkthrough", order: 2, duration: "30m" },
            { title: "Crypto Challenges (Caesar, XOR)", order: 3, duration: "25m" },
            { title: "Reverse Engineering Basics", order: 4, duration: "35m" },
            { title: "Binary Exploitation (Intro pwn)", order: 5, duration: "40m" },
            { title: "Forensics Challenges", order: 6, duration: "30m" },
            { title: "Steganography & OSINT", order: 7, duration: "20m" },
            { title: "Team Strategy & Tools", order: 8, duration: "15m" },
        ],
    },
];

async function main() {
    console.log("🌱 Seeding database...");

    // Create a demo admin user
    const adminHash = await bcrypt.hash("admin123", 12);
    const admin = await prisma.user.upsert({
        where: { email: "admin@cyberlabs.io" },
        update: {},
        create: {
            name: "Admin",
            email: "admin@cyberlabs.io",
            passwordHash: adminHash,
            role: "ADMIN",
        },
    });

    // Create a demo student user
    const studentHash = await bcrypt.hash("student123", 12);
    const student = await prisma.user.upsert({
        where: { email: "student@cyberlabs.io" },
        update: {},
        create: {
            name: "Waqas",
            email: "student@cyberlabs.io",
            passwordHash: studentHash,
            role: "STUDENT",
        },
    });

    // Seed all courses
    for (const courseData of courses) {
        const { lessons, ...courseFields } = courseData;
        const course = await prisma.course.upsert({
            where: { slug: courseFields.slug },
            update: {},
            create: {
                ...courseFields,
                lessons: {
                    create: lessons,
                },
            },
        });

        // Enroll the demo student in the first 4 courses
        const enrollSlugs = ["web-app-hacking", "network-intrusion", "malware-fundamentals", "digital-forensics"];
        if (enrollSlugs.includes(courseFields.slug)) {
            await prisma.enrollment.upsert({
                where: { userId_courseId: { userId: student.id, courseId: course.id } },
                update: {},
                create: { userId: student.id, courseId: course.id },
            });

            // Add some progress for the first 3 enrolled courses
            const progressMap: Record<string, number> = {
                "web-app-hacking": 10,
                "network-intrusion": 3,
                "malware-fundamentals": 11,
            };
            const completedCount = progressMap[courseFields.slug];
            if (completedCount) {
                const courseLessons = await prisma.lesson.findMany({
                    where: { courseId: course.id },
                    orderBy: { order: "asc" },
                    take: completedCount,
                });
                for (const lesson of courseLessons) {
                    await prisma.progress.upsert({
                        where: { userId_lessonId: { userId: student.id, lessonId: lesson.id } },
                        update: {},
                        create: { userId: student.id, lessonId: lesson.id },
                    });
                }
            }
        }
    }

    console.log(`✅ Seeded ${courses.length} courses`);
    console.log("✅ Demo users created:");
    console.log("   Admin: admin@cyberlabs.io / admin123");
    console.log("   Student: student@cyberlabs.io / student123");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
