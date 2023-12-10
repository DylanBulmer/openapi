export default class ApiError extends Error {
  status: number;

  constructor({ message, status }: { message?: string; status?: number }) {
    super(message || "An unexpected error occured.");
    this.status = status || 500;
  }
}
