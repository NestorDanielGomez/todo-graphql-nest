import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Agregado rapido de tareas" })
export class AggregationsType {

    @Field(() => Int)
    total: number

    @Field(() => Int)
    pending: number

    @Field(() => Int)
    completed: number

    @Field(() => Int, { deprecationReason: "ya no se utiliza" })
    totalTodosCompleted: number
}