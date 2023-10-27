import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dtos/inputs';
import { StatusArgs } from './dtos/args/status.args';


@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {
            id: 1,
            description: "primero",
            done: false
        },
        {
            id: 2,
            description: "segundo",
            done: true
        },
        {
            id: 3,
            description: "tercero",
            done: false
        },
    ]

    get totalTodos() {
        return this.todos.length
    }
    get pendingTodos() {
        return this.todos.filter(todo => todo.done === false).length
    }
    get completedTodos() {
        return this.todos.filter(todo => todo.done === true).length
    }

    findAll(statusArgs: StatusArgs): Todo[] {
        const { status } = statusArgs
        if (status !== undefined) return this.todos.filter(todo => todo.done === status)
        return this.todos
    }

    findOne(id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id)
        if (!todo) throw new NotFoundException(`La tarea con el id:${id} no existe`)
        return todo
    }

    create(createTodoInput: CreateTodoInput): Todo {
        const todo = new Todo()
        todo.description = createTodoInput.description
        todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1
        this.todos.push(todo)
        return todo

    }

    update(updateTodoInput: UpdateTodoInput) {
        const { id, done, description } = updateTodoInput
        const todoToUpdate = this.findOne(id)
        if (description) todoToUpdate.description = description
        if (done !== undefined) todoToUpdate.done = done

        this.todos = this.todos.map(todo => {
            return (todo.id === id) ? todoToUpdate : todo
        })
        return todoToUpdate
    }

    delete(id: number): Boolean {
        const todoToDelete = this.findOne(id)
        this.todos = this.todos.filter(todo => todo.id !== todoToDelete.id)
        return true
    }
}
