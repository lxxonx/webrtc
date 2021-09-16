-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isTutor" BOOLEAN NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT DEFAULT E'',
    "birthYear" SMALLINT NOT NULL,
    "leftClass" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "videoUrl" TEXT,
    "schedule" TIMESTAMP(3) NOT NULL,
    "isCreated" BOOLEAN NOT NULL DEFAULT false,
    "studentId" INTEGER,
    "tutorId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Class.schedule_tutorId_unique" ON "Class"("schedule", "tutorId");

-- AddForeignKey
ALTER TABLE "Class" ADD FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
