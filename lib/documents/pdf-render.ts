// @ts-ignore
import { PdfTeXEngine } from "swiftlatex";
import { LaTeXOpts } from "./types";

export class PDFRenderer {
  private engine: PdfTeXEngine;
  
  constructor() {
    this.engine = new PdfTeXEngine();
  }

  async render(texContent: string, opts: LaTeXOpts) {
    try {
      await this.engine.loadEngine();
      
      // Add files to virtual filesystem
      this.engine.writeMemFSFile("document.tex", texContent);

      // Compile document
      const result = await this.engine.compileLaTeX("document.tex", opts.cmd);

      if (result.status !== 0) {
        throw new Error("PDF compilation failed");
      }

      // Get PDF data
      const pdfData = this.engine.readMemFSFile("document.pdf");
      
      return pdfData;
    } catch (error) {
      console.error("PDF rendering failed:", error);
      throw error;
    }
  }
}