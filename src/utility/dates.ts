export class Dates {
  // Convert UTC date string to phone's local date string
  static utcToLocal(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  // Convert army date format (YYYYMMDD) to DD/MM/YYYY
  static armyToDDMMYYYY(armyDate: string): string {
    if (!armyDate || armyDate.length !== 8) return '';
    const year = armyDate.substring(0, 4);
    const month = armyDate.substring(4, 6);
    const day = armyDate.substring(6, 8);
    return `${day}/${month}/${year}`;
  }
} 