/**
 * ============================================================================
 *  CONTENT COLLECTIONS
 * ============================================================================
 *  Courses, faculty, toppers and blog posts are Markdown files in src/content/.
 *  Adding a course is a new .md file — not a copy-paste of 60 lines of HTML.
 *
 *  The `schema` below is what makes this safe for a non-developer to edit:
 *  if someone deletes the fee or misspells a field name, `npm run build`
 *  fails with a clear message instead of quietly publishing a broken page.
 *  It is also what a Git-based CMS (Decap / Sveltia) reads to generate its
 *  edit forms automatically.
 * ============================================================================
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    exam: z.string(), // shown above the course name, e.g. "SSC CGL · Tier 1 + Tier 2"
    targetExam: z.string(), // the exam this page should rank for, e.g. "SSC CGL"
    duration: z.string(),
    timing: z.string(),
    mode: z.enum(['Offline', 'Online', 'Weekend', 'Offline + Online']),
    fee: z.number(), // plain number — formatted as ₹45,000 at render time
    instalments: z.string().optional(),
    inclusions: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    // Used only on the course's own landing page
    seoTitle: z.string(),
    seoDescription: z.string(),
    intro: z.string(),
  }),
});

const faculty = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faculty' }),
  schema: z.object({
    name: z.string(),
    subject: z.string(),
    credential: z.string(),
    quote: z.string(),
    photo: z.string().optional(), // e.g. "/photos/faculty/rajeev.jpg"
    initials: z.string(),
    order: z.number().default(99),
  }),
});

const toppers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/toppers' }),
  schema: z.object({
    name: z.string(),
    rank: z.string(), // "AIR 61" or "Selected"
    exam: z.string(),
    year: z.number(),
    post: z.string().optional(),
    photo: z.string().optional(),
    initials: z.string(),
    order: z.number().default(99),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tag: z.string().default('Exam update'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { courses, faculty, toppers, posts };
