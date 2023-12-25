/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OpenAPIV3_1 } from "openapi-types";
import { Operation } from "../types/Route";
import Response from "./Response";
import Parameter from "./Paramater";
import { BaseDescriptive } from "./Base";
import MediaTypeObject from "./MediaTypeObject";

export default class Route<
  RequestBody extends object = any,
  ParamKeys extends string = string,
  QueryKeys extends string = string,
> extends BaseDescriptive<OpenAPIV3_1.OperationObject> {
  private _operation: Operation<RequestBody, ParamKeys, QueryKeys>[] = [];

  params(...params: Parameter[]) {
    if (!this._doc.parameters) this._doc.parameters = [];
    this._doc.parameters.push(...params.map(p => p.doc()));
    return this;
  }

  tags(...tags: string[]) {
    if (!this._doc.tags) this._doc.tags = [];
    this._doc.tags.push(...tags);
    return this;
  }

  response(status: string, resp: Response) {
    if (!this._doc.responses) this._doc.responses = {};
    this._doc.responses[status] = resp.doc();
    return this;
  }

  request(mime: string, obj: MediaTypeObject) {
    if (!this._doc.requestBody) this._doc.requestBody = { content: {} };
    (this._doc.requestBody as OpenAPIV3_1.RequestBodyObject).content[mime] =
      obj.doc();
    return this;
  }

  operation(...operations: Operation<RequestBody, ParamKeys, QueryKeys>[]) {
    this._operation = operations;
    return this;
  }

  get express(): Operation<RequestBody, ParamKeys, QueryKeys>[] {
    return this._operation;
  }
}
