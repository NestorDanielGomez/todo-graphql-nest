import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HolaMundoResolver {
    @Query(() => String, { description: "Retorna el string hola mundo", name: "HelloMethod" })
    helloWorld(): string {
        return "hola mundo"
    }
    @Query(() => Float, { name: "randomNumber" })
    getRandomNumber(): number {
        return Math.random() * 100
    }
    @Query(() => Int, { name: "randomNumberFromZeroTo", description: "Retorna el numero entre 0 y t (default 6)" })
    getRandomFromZeroTo(@Args("to", { nullable: true, type: () => Int }) to: number = 6): number {
        return Math.floor(Math.random() * to)
    }
}
