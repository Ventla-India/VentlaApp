export class Validation {
  // Check if an email address is valid
  static isEmail(email: string): boolean {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  }
} 