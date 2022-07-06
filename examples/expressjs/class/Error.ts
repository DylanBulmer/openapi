interface IError {
  status: number;
  message: string;
}

export class Error {
  status: IError["status"];
  message: IError["message"];

  constructor({ status, message }: IError) {
    this.status = status;
    this.message = message;
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
