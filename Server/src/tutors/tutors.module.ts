import { Module } from "@nestjs/common";
import { TutorsService } from "./tutors.service";
import { TutorsResolver } from "./tutors.resolver";

@Module({
  providers: [TutorsService, TutorsResolver],
})
export class TutorsModule {}
