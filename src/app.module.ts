import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PDF } from './pdf.entity';
import { PDFController } from './pdf.controller';
import { PDFService } from './pdf.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Tharun@1104',
      database: 'mydatabase',
      entities: [PDF],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PDF]),
  ],
  controllers: [PDFController],
  providers: [PDFService],
})
export class AppModule { }
