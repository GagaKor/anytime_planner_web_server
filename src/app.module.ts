import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { ScheduleModule } from "./schedule/schedule.module";
import { GraphQLJSON } from "graphql-type-json";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      buildSchemaOptions: {
        // dateScalarMode: "timestamp",
        resolvers: { JSON: GraphQLJSON },
      },
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + "/**/*.entity.{js,ts}"],
      synchronize: true,
    }),
    UserModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
