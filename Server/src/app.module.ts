import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { PrismaService } from "./prisma.service";
import { StudentsModule } from "./students/students.module";
import { TutorsModule } from "./tutors/tutors.module";
import { StreamsGateway } from "./streams.gateway";

@Module({
  imports: [
    StudentsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      subscriptions: {
        "graphql-ws": true,
      },
    }),
    TutorsModule,
  ],
  providers: [PrismaService, StreamsGateway],
})
export class AppModule {}
