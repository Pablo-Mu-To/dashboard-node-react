import { describe, it, expect, beforeEach } from 'vitest';
import { CsvParser } from './CsvParser.js';

describe('CsvParser', () => {
  let parser: CsvParser;

  beforeEach(() => {
    parser = new CsvParser();
  });

  describe('parseDate', () => {
    it('should parse ISO format (YYYY-MM-DD)', () => {
      const result = parser.parseDate('2024-02-10');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(1); // Months are 0-indexed
      expect(result?.getDate()).toBe(10);
    });

    it('should parse European format (DD/MM/YYYY)', () => {
      const result = parser.parseDate('03/04/2024');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(3); // April (0-indexed)
      expect(result?.getDate()).toBe(3);
    });

    it('should parse American format (YYYY/MM/DD)', () => {
      const result = parser.parseDate('2025/01/05');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2025);
      expect(result?.getMonth()).toBe(0); // January
      expect(result?.getDate()).toBe(5);
    });

    it('should return null for empty string', () => {
      expect(parser.parseDate('')).toBeNull();
      expect(parser.parseDate('   ')).toBeNull();
    });

    it('should return null for unsupported format', () => {
      expect(parser.parseDate('invalid-date')).toBeNull();
      expect(parser.parseDate('not-a-date')).toBeNull();
      expect(parser.parseDate('12-34-5678')).toBeNull();
    });
  });

  describe('parseBoolean', () => {
    it('should parse "true" as true', () => {
      expect(parser.parseBoolean('true')).toBe(true);
    });

    it('should parse "TRUE" as true (case insensitive)', () => {
      expect(parser.parseBoolean('TRUE')).toBe(true);
    });

    it('should parse "false" as false', () => {
      expect(parser.parseBoolean('false')).toBe(false);
    });

    it('should parse "FALSE" as false (case insensitive)', () => {
      expect(parser.parseBoolean('FALSE')).toBe(false);
    });

    it('should parse empty string as false', () => {
      expect(parser.parseBoolean('')).toBe(false);
      expect(parser.parseBoolean('   ')).toBe(false);
    });

    it('should parse invalid values as false', () => {
      expect(parser.parseBoolean('yes')).toBe(false);
      expect(parser.parseBoolean('1')).toBe(false);
      expect(parser.parseBoolean('invalid')).toBe(false);
    });
  });

  describe('parseNumber', () => {
    it('should parse valid positive numbers', () => {
      expect(parser.parseNumber('42')).toBe(42);
      expect(parser.parseNumber('3.14')).toBe(3.14);
      expect(parser.parseNumber('2.5')).toBe(2.5);
    });

    it('should parse negative numbers when allowed', () => {
      expect(parser.parseNumber('-10', true)).toBe(-10);
      expect(parser.parseNumber('-5.5', true)).toBe(-5.5);
    });

    it('should return 0 for negative numbers when not allowed', () => {
      expect(parser.parseNumber('-10', false)).toBe(0);
      expect(parser.parseNumber('-5.5')).toBe(0); // Default is false
    });

    it('should return 0 for empty string', () => {
      expect(parser.parseNumber('')).toBe(0);
      expect(parser.parseNumber('   ')).toBe(0);
    });

    it('should return 0 for "N/A"', () => {
      expect(parser.parseNumber('N/A')).toBe(0);
      expect(parser.parseNumber('n/a')).toBe(0);
    });

    it('should return 0 for "NaN"', () => {
      expect(parser.parseNumber('NaN')).toBe(0);
      expect(parser.parseNumber('nan')).toBe(0);
    });

    it('should return 0 for invalid number strings', () => {
      expect(parser.parseNumber('abc')).toBe(0);
      expect(parser.parseNumber('not-a-number')).toBe(0);
      expect(parser.parseNumber('xyz123')).toBe(0);
    });
  });

  describe('parseString', () => {
    it('should return trimmed string', () => {
      expect(parser.parseString('  hello  ')).toBe('hello');
      expect(parser.parseString('world')).toBe('world');
    });

    it('should return default value for empty string', () => {
      expect(parser.parseString('', 'default')).toBe('default');
      expect(parser.parseString('   ', 'fallback')).toBe('fallback');
    });

    it('should return empty string as default when no default provided', () => {
      expect(parser.parseString('')).toBe('');
      expect(parser.parseString('   ')).toBe('');
    });

    it('should preserve content after trimming whitespace', () => {
      expect(parser.parseString('  multiple   words  ')).toBe('multiple   words');
    });
  });

  describe('Integration - Real CSV scenarios', () => {
    it('should handle mixed date formats from CSV', () => {
      // Simula datos reales del CSV voluntarios.csv
      const dates = [
        '2024-02-10',      // ISO
        '03/04/2024',      // European
        '2025/01/05',      // American
      ];

      const parsed = dates.map(d => parser.parseDate(d));

      expect(parsed[0]?.getFullYear()).toBe(2024);
      expect(parsed[1]?.getFullYear()).toBe(2024);
      expect(parsed[2]?.getFullYear()).toBe(2025);
    });

    it('should handle invalid hours from turnos.csv', () => {
      // Simula horas inválidas que podrían aparecer en turnos.csv
      expect(parser.parseNumber('-2', false)).toBe(0); // Horas negativas
      expect(parser.parseNumber('N/A', false)).toBe(0); // Valor no disponible
      expect(parser.parseNumber('3', false)).toBe(3);   // Horas válidas
    });

    it('should normalize boolean values from voluntarios.csv', () => {
      // Campo "activo" puede venir en diferentes formatos
      expect(parser.parseBoolean('true')).toBe(true);
      expect(parser.parseBoolean('TRUE')).toBe(true);
      expect(parser.parseBoolean('false')).toBe(false);
    });
  });
});
