/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OpenAPIV3_1 } from "openapi-types";
import { Operation } from "../types/Route";
import Response from "./Response.js";
import Parameter from "./Paramater.js";
import { BaseDescriptive } from "./Base.js";

export default class Route<
  ParamKeys extends string = string,
  QueryKeys extends string = string,
> extends BaseDescriptive<OpenAPIV3_1.OperationObject> {
  private _operation: Operation<ParamKeys, QueryKeys>[] = [];

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

  operation(...operations: Operation<ParamKeys, QueryKeys>[]) {
    this._operation = operations;
    return this;
  }

  get express(): Operation<ParamKeys, QueryKeys>[] {
    return this._operation;
  }
}
