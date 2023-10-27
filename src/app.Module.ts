import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { HolaMundoModule } from './hola-mundo/hola-mundo.module';
import { TodoModule } from './todo/todo.module';





@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            driver: ApolloDriver,
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        HolaMundoModule, TodoModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
