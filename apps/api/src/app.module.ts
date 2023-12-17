import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
  exports: [],
  providers: [],
})
export class AppModule {}
