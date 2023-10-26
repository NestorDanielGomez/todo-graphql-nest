import { Module } from '@nestjs/common';
import { HolaMundoResolver } from './hola-mundo.resolver';

@Module({
  providers: [HolaMundoResolver]
})
export class HolaMundoModule {}
