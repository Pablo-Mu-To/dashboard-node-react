import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class CsvParser {
  private dataPath: string;

  constructor() {
    // Path relativo a la carpeta data desde el root del proyecto
    this.dataPath = join(__dirname, '../../../..', 'data');
  }

  /**
   * Lee y parsea un archivo CSV
   */
  readCsv(filename: string): any[] {
    const filePath = join(this.dataPath, filename);
    const fileContent = readFileSync(filePath, 'utf-8');

    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
  }

  /**
   * Normaliza fechas con diferentes formatos
   * Formatos soportados: YYYY-MM-DD, DD/MM/YYYY, YYYY/MM/DD
   */
  parseDate(dateStr: string): Date | null {
    if (!dateStr || dateStr.trim() === '') return null;

    // Formato: YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Date(dateStr);
    }

    // Formato: DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [day, month, year] = dateStr.split('/');
      return new Date(`${year}-${month}-${day}`);
    }

    // Formato: YYYY/MM/DD
    if (/^\d{4}\/\d{2}\/\d{2}$/.test(dateStr)) {
      const normalized = dateStr.replace(/\//g, '-');
      return new Date(normalized);
    }

    return null;
  }

  /**
   * Normaliza valores booleanos
   * Acepta: true, TRUE, false, FALSE
   */
  parseBoolean(value: string): boolean {
    if (!value || value.trim() === '') return false;
    const normalized = value.trim().toLowerCase();
    return normalized === 'true';
  }

  /**
   * Normaliza números, manejando casos especiales
   * - Valores vacíos -> 0
   * - "N/A", "NaN" -> 0
   * - Números negativos -> 0 (para horas/importes no válidos)
   */
  parseNumber(value: string, allowNegative: boolean = false): number {
    if (!value || value.trim() === '') return 0;

    const normalized = value.trim().toUpperCase();

    // Casos especiales
    if (normalized === 'N/A' || normalized === 'NAN') return 0;

    const parsed = parseFloat(value);

    if (isNaN(parsed)) return 0;

    // Si no permitimos negativos y el valor es negativo, retornamos 0
    if (!allowNegative && parsed < 0) return 0;

    return parsed;
  }

  /**
   * Normaliza strings, manejando valores vacíos
   */
  parseString(value: string, defaultValue: string = ''): string {
    if (!value || value.trim() === '') return defaultValue;
    return value.trim();
  }
}