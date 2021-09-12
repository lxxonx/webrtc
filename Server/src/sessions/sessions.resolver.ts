import { BadRequestException } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { Session } from "./models/session.model";
import { SessionsService } from "./sessions.service";

@Resolver()
export class SessionsResolver {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly authService: AuthService,
    private readonly prisma: PrismaService
  ) {}

  @Mutation(() => Session)
  async createSession(
    @Args("schedule") schedule: Date,
    @Context() { request }
  ): Promise<Session> {
    // only tutor can create a session
    const token = request.cookies.refresh;
    if (!token) {
      return null;
    }
    const user = await this.authService.findOneByToken(token);
    // not tutor? throw error
    if (!user) {
      throw new BadRequestException();
    }
    if (!user.isTutor) {
      throw new UnauthorizedException();
    }

    return this.prisma.session.create({
      data: {
        schedule,
        tutorId: user.id,
      },
      include: { tutor: true },
    });
  }
  @Mutation(() => Session)
  async updateStudent(
    @Args("schedule") schedule: Date,
    @Args("tutorId", { nullable: true }) tutorId: number,
    @Args("studentId", { nullable: true }) studentId: number,
    @Context() { request }
  ) {
    // register students
    const token = request.cookies.refresh;
    if (!token) {
      return null;
    }
    const user = await this.authService.findOneByToken(token);
    if (user.isTutor) {
      // when this user is tutor
      if (!studentId) {
        // studentId must be provided
        throw new BadRequestException();
      }
      // add student id to session
      return this.prisma.session.update({
        where: {
          schedule_tutorId: {
            schedule,
            tutorId: user.id,
          },
        },
        data: {
          studentId,
        },
      });
    } else {
      // when this user is student
      if (!tutorId) {
        // tutor id must be provided
        throw new BadRequestException();
      }
      // update this user id to session
      return this.prisma.session.update({
        where: {
          schedule_tutorId: {
            schedule,
            tutorId,
          },
        },
        data: {
          studentId: user.id,
        },
      });
    }
  }
  createRoom() {
    // create room id
  }
  uploadVideo() {
    // upload video link
  }
}
