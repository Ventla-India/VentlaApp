export class Dates {
  // Convert UTC date string to phone's local date string
  static utcToLocal(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Convert army date format (YYYYMMDD) to DD/MM/YYYY
  static armyToDDMMYYYY(armyDate: string): string {
    if (!armyDate || armyDate.length !== 8) return '';
    const year = armyDate.substring(0, 4);
    const month = armyDate.substring(4, 6);
    const day = armyDate.substring(6, 8);
    return `${day}/${month}/${year}`;
  }

  // Convert year string (e.g., '1999') to a formatted date string (e.g., '01/01/1999')
  static yearToDate(year: string): string {
    if (!year || isNaN(Number(year))) return '';
    // Create a date object for January 1st of the given year
    const date = new Date(Number(year), 0, 1);
    // Format as DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const formatted = `${day}/${month}/${date.getFullYear()}`;
    return formatted;
  }

  // Smartly format a date string that could be a year, army date, or UTC date
  static smartFormatDate(dateStr: string): string {
    if (!dateStr) return '';
    // Army date: 8 digits, e.g., 20240607
    if (/^\d{8}$/.test(dateStr)) {
      return Dates.armyToDDMMYYYY(dateStr);
    }
    // UTC date: contains 'T' and 'Z' or matches ISO format
    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?Z?/.test(dateStr)) {
      return Dates.utcToLocal(dateStr);
    }
    // Year only: 4 digits
    if (/^\d{4}$/.test(dateStr)) {
      return Dates.yearToDate(dateStr);
    }
    // Fallback: return as is
    return dateStr;
  }
} 