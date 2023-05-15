import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PDF } from './pdf.entity';

@Injectable()
export class PDFService {
  constructor(@InjectRepository(PDF) private pdfRepository: Repository<PDF>) { }

  async uploadPDF(pdf: PDF) {
    await this.pdfRepository.save(pdf);
  }

  async downloadPDF(): Promise<PDF> {
    return await this.pdfRepository.findOne({});
  }

  async getAllPDFs(): Promise<PDF[]> {
    return this.pdfRepository.find();
  }

  async getLatestPDF(): Promise<PDF> {
    const queryBuilder = this.pdfRepository.createQueryBuilder('pdf');
    queryBuilder.orderBy('pdf.id', 'DESC'); // 'id' is the primary key column
    queryBuilder.take(1);

    return queryBuilder.getOne();
  }
}
