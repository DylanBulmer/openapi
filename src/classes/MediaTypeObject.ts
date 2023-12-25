import { OpenAPIV3_1 } from "openapi-types";
import { Base } from "./Base";

export default class MediaTypeObject extends Base<OpenAPIV3_1.MediaTypeObject> {
  constructor() {
    super();
  }

  encoding(media: string, encoding: OpenAPIV3_1.EncodingObject) {
    if (!this._doc.encoding) this._doc.encoding = {};
    this._doc.encoding[media] = encoding;
  }

  schema(schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject) {
    this._doc.schema = schema;
    return this;
  }

  example(
    name: string,
    example: OpenAPIV3_1.ExampleObject | OpenAPIV3_1.ReferenceObject,
  ) {
    if (!this._doc.examples) this._doc.examples = {};
    this._doc.examples[name] = example;
  }
}
