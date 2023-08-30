import { OpenAPIV3_1 } from "openapi-types";
import { BaseDescriptive } from "./Base";

export interface IResponse {
  description: string;
  content: {
    [k: string]: OpenAPIV3_1.MediaTypeObject;
  };
}

export default class Response extends BaseDescriptive<OpenAPIV3_1.ResponseObject> {
  constructor(doc = { description: "No description" }) {
    super(doc);
  }

  content(mediaType: string, obj: OpenAPIV3_1.MediaTypeObject) {
    if (!this._doc.content) this._doc.content = {};
    this._doc.content[mediaType] = obj;
    return this;
  }
}
