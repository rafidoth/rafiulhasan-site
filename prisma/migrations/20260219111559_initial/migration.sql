-- CreateEnum
CREATE TYPE "Technology" AS ENUM ('TYPESCRIPT', 'JAVASCRIPT', 'PYTHON', 'GO', 'RUST', 'JAVA', 'CPP', 'C', 'REACT', 'NEXTJS', 'VUEJS', 'ANGULAR', 'SVELTE', 'NODEJS', 'EXPRESS', 'NESTJS', 'DJANGO', 'FLASK', 'FASTAPI', 'POSTGRESQL', 'MYSQL', 'MONGODB', 'REDIS', 'SQLITE', 'PRISMA', 'DOCKER', 'KUBERNETES', 'AWS', 'GCP', 'AZURE', 'LINUX', 'GIT', 'GRAPHQL', 'REST', 'GRPC', 'TAILWINDCSS', 'CSS', 'HTML', 'FIREBASE', 'SUPABASE', 'VERCEL', 'NGINX', 'RABBITMQ', 'KAFKA', 'ELASTICSEARCH', 'TERRAFORM', 'GITHUB_ACTIONS');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "technologies" "Technology"[],
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutMe" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutMe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
