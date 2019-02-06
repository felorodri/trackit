export class User {
  private name: string;
  private email: string;
  private metadata: any;
  private language: any;
  constructor(name: string, email: string, metadata: any, language: string) {
    this.name = name;
    this.email = email;
    this.metadata = metadata;
    this.language = language;
  }
  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }
  getLanguage(): any {
    return this.language;
  }
}
