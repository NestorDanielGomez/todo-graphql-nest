import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dtos/inputs';
import { StatusArgs } from './dtos/args/status.args';
import { AggregationsType } from './types/aggregations.type';


@Resolver(() => Todo)
export class TodoResolver {
    constructor(
        private readonly todoService: TodoService
    ) { }


    @Query(() => [Todo], { name: "todos" })
    findAll(@Args() statusArgs: StatusArgs): Todo[] {
        return this.todoService.findAll(statusArgs)
    }


    @Query(() => Todo, { name: "todo" })
    findOne(
        @Args("id", { type: () => Int }) id: number) {
        return this.todoService.findOne(id)
    }

    @Mutation(() => Todo, { name: "createTodo" })
    createTodo(
        @Args("createTodoInput", { type: () => CreateTodoInput }) createTodoInput: CreateTodoInput) {
        return this.todoService.create(createTodoInput)
    }

    @Mutation(() => Todo, { name: "updateTodo" })
    updateTodo(
        @Args("updateTodoInput", { type: () => UpdateTodoInput }) updateTodoInput: UpdateTodoInput) {
        return this.todoService.update(updateTodoInput)
    }
    @Mutation(() => Boolean, { name: "deleteTodo" })
    deleteTodo(
        @Args("id", { type: () => Int }) id: number) {
        return this.todoService.delete(id)
    }

    @Query(() => Int, { name: "totalTodos" })
    totalTodos(): number {
        return this.todoService.totalTodos
    }

    @Query(() => Int, { name: "pendingTodos" })
    pendingTodos(): number {
        return this.todoService.pendingTodos
    }
    @Query(() => Int, { name: "completedTodos" })
    completedTodos(): number {
        return this.todoService.completedTodos
    }

    @Query(() => AggregationsType)
    aggregations(): AggregationsType {
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodosCompleted: this.todoService.totalTodos
        }
    }
}
