-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_userStatsId_fkey";

-- DropForeignKey
ALTER TABLE "TestRecord" DROP CONSTRAINT "TestRecord_testId_fkey";

-- DropForeignKey
ALTER TABLE "TestRecord" DROP CONSTRAINT "TestRecord_userStatsId_fkey";

-- DropForeignKey
ALTER TABLE "TypingTimePerDay" DROP CONSTRAINT "TypingTimePerDay_userStatsId_fkey";

-- DropForeignKey
ALTER TABLE "UserStats" DROP CONSTRAINT "UserStats_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestRecord" ADD CONSTRAINT "TestRecord_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestRecord" ADD CONSTRAINT "TestRecord_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypingTimePerDay" ADD CONSTRAINT "TypingTimePerDay_userStatsId_fkey" FOREIGN KEY ("userStatsId") REFERENCES "UserStats"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
