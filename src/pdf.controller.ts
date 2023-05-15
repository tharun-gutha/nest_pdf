import { Controller, Get, Post, UploadedFile, UseInterceptors, Res, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PDFDocument } from 'pdf-lib';
import { PDF } from './pdf.entity';
import { PDFService } from './pdf.service';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('pdf')
export class PDFController {
  constructor(
    @InjectRepository(PDF) private pdfRepository: Repository<PDF>,
    private pdfService: PDFService,
  ) { }

  @Get('store')
  async storePDF(): Promise<string> {
    const filePath = 'D:/attendance/example.pdf';
    const fileData = fs.readFileSync(filePath);
    const pdf = new PDF();
    pdf.name = 'example.pdf';
    pdf.data = Buffer.from(fileData)
    await this.pdfService.uploadPDF(pdf);
    return `PDF stored successfully ${fileData}`;
  }
  @Get('list')
  async listPDFs(@Res() res: Response): Promise<any> {
    const pdfs = await this.pdfService.getAllPDFs();
    return res.json(pdfs);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('pdf'))
  async uploadPDF(@UploadedFile() file) {
    const pdfDoc = await PDFDocument.load(file.buffer);
    const pdf = new PDF();
    pdf.name = file.originalname;
    pdf.data = file.buffer;
    await this.pdfRepository.save(pdf);
    return { message: 'PDF uploaded successfully' };
  }
  
  @Post('submit')
  async submitPDF(@Body() body: { data: string }) {
    const modifiedPdfBase64 = body.data;
    const modifiedPdfBuffer = Buffer.from(modifiedPdfBase64, 'base64');
    const pdfDoc = await PDFDocument.load(modifiedPdfBuffer);
    const pdf = new PDF();
    pdf.name = 'example.pdf';
    pdf.data = modifiedPdfBuffer;
    await this.pdfRepository.save(pdf);
    return { message: 'Modified PDF stored successfully' };
  }


  @Get('display')
  async displayPDF(@Res() res: Response): Promise<void> {
    const pdf = await this.pdfService.getLatestPDF(); // Change this to retrieve the desired PDF from the database
    const base64Data = pdf.data.toString('base64');

    res.json({ data: base64Data });
  }
}
