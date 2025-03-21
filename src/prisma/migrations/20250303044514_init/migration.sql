-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('TIME', 'WORDS', 'TEXT', 'AI', 'CUSTOM');

-- CreateEnum
CREATE TYPE "TestValueType" AS ENUM ('SECONDS', 'WORDS', 'SENTENCES');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStats" (
    "userId" TEXT NOT NULL,
    "totalTypingTimeMillis" BIGINT NOT NULL,
    "totalStartedTests" INTEGER NOT NULL,
    "totalCompletedTests" INTEGER NOT NULL,
    "totalFullyCorrectTests" INTEGER NOT NULL,
    "totalTypedWords" BIGINT NOT NULL,
    "totalCorrectWords" BIGINT NOT NULL,
    "totalTypedChars" BIGINT NOT NULL,
    "totalCorrectChars" BIGINT NOT NULL,
    "totalXP" INTEGER NOT NULL,
    "avgWPM" JSONB NOT NULL,
    "last100TestsAvgWPM" JSONB NOT NULL,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "TestRecord" (
    "id" TEXT NOT NULL,
    "userStatsId" TEXT NOT NULL,
    "testType" "TestType" NOT NULL,
    "testValueType" "TestValueType" NOT NULL,
    "testValue" INTEGER NOT NULL,
    "typedText" TEXT NOT NULL,
    "needText" TEXT NOT NULL,
    "startTestTime" BIGINT NOT NULL,
    "endTestTime" BIGINT NOT NULL,
    "wpm" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "testId" TEXT,

    CONSTRAINT "TestRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "userStatsId" TEXT NOT NULL,
    "typedText" TEXT NOT NULL,
    "needText" TEXT NOT NULL,
    "startTestTime" BIGINT NOT NULL,
    "endTestTime" BIGINT NOT NULL,
    "testType" "TestType" NOT NULL,
    "testValueType" "TestValueType" NOT NULL,
    "testValue" INTEGER NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypingTimePerDay" (
    "id" TEXT NOT NULL,
    "userStatsId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "timeMillis" BIGINT NOT NULL,
    "avgWPM" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TypingTimePerDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_key" ON "UserStats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TestRecord_userStatsId_wpm_key" ON "TestRecord"("userStatsId", "wpm");

-- CreateIndex
CREATE UNIQUE INDEX "TypingTimePerDay_date_key" ON "TypingTimePerDay"("date");

-- CreateIndex
CREATE UNIQUE INDEX "TypingTimePerDay_userStatsId_date_key" ON "TypingTimePerDay"("userStatsId", "date");

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestRecord" ADD CONSTRAINT "TestRecord_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestRecord" ADD CONSTRAINT "TestRecord_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypingTimePerDay" ADD CONSTRAINT "TypingTimePerDay_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
