import "reflect-metadata";
import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewStudentInput } from "./dto/new-student.input";
import { StudentsArgs } from "./dto/students.args";
import { Student } from "./models/student.model";
import { StudentsService } from "./students.service";
import { StudentLoginInput } from "./Dto/student-login.input";

@Resolver(Student)
export class StudentResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Query(() => Student)
  async getStudentById(@Args("id") id: number): Promise<Student> {
    const student = await this.studentsService.findOneById(id);
    if (!student) {
      throw new NotFoundException(id);
    }
    return student;
  }

  @Query(() => [Student])
  getManyStudents(@Args() studentsArgs: StudentsArgs): Promise<Student[]> {
    return this.studentsService.findAll(studentsArgs);
  }

  @Mutation(() => Student)
  async registerStudent(
    @Args("newStudentData") newRecipeData: NewStudentInput
  ): Promise<Student> {
    const recipe = await this.studentsService.create(newRecipeData);
    return recipe;
  }

  @Mutation(() => Boolean)
  async removeStudentById(@Args("id") id: number) {
    return this.studentsService.remove(id);
  }

  @Mutation(() => Student)
  async loginStudent(
    @Args("studentLoginInput") studentLoginInput: StudentLoginInput
  ): Promise<Student> {
    // return type needed to be created
    // this mutation need to return jwt && refresh token too
    return this.studentsService.login(studentLoginInput);
  }
}
