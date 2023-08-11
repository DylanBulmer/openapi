import { OpenAPIV3_1 } from "openapi-types";

export interface IResponse {
  description: string;
  content?: {
    [k: string]: OpenAPIV3_1.MediaTypeObject;
  };
}

export default class Response {
  description: IResponse["description"];
  content?: IResponse["content"];

  constructor({ description, content }: IResponse) {
    this.description = description;
    this.content = content;
  }

  toApiDoc(): OpenAPIV3_1.ResponseObject {
    return {
      description: this.description,
      content: this.content,
    };
  }
}
