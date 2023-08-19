import { OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
import { BaseDescriptive } from "./Base.js";

export default class Parameter extends BaseDescriptive<OpenAPIV3_1.ParameterObject> {
  constructor(param = { name: "Unknown", in: "quary" }) {
    super(param);
  }

  name(name: string) {
    this._doc.name = name;
    return this;
  }

  in(i: "path" | "query" | "header" | "cookie") {
    this._doc.in = i;
    return this;
  }

  required(required = true) {
    this._doc.required = required;
    return this;
  }

  type(type?: OpenAPIV3.NonArraySchemaObjectType) {
    this._doc.schema = { type: type };
    return this;
  }
}
