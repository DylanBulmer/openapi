/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
import { Operation } from "../types/Route";
import Response from "./Response.js";

interface Parameter {
  type?: OpenAPIV3.NonArraySchemaObjectType | undefined;
  required?: boolean;
  description?: string;
}

export default class Route<
  ParamKeys extends string = string,
  QueryKeys extends string = string,
> {
  private _summary?: string;
  private _description?: string;
  private _operation: Operation<ParamKeys, QueryKeys>[] = [];
  // @ts-ignore
  private _params = {} as {
    [Name in ParamKeys]: Parameter;
  };
  // @ts-ignore
  private _queryParams = {} as {
    [Name in QueryKeys]: Parameter;
  };
  private _tags?: string[];
  private _responses: OpenAPIV3_1.ResponsesObject = {};

  summary(summary: string) {
    this._summary = summary;
    return this;
  }

  description(description: string) {
    this._description = description;
    return this;
  }

  params(params: Record<ParamKeys, Parameter>) {
    this._params = params;
    return this;
  }

  query(queryParams: Record<QueryKeys, Parameter>) {
    this._queryParams = queryParams;
    return this;
  }

  tags(...tags: string[]) {
    this._tags = tags;
    return this;
  }

  responses(...reponses: Record<string, Response>[]) {
    this._responses = reponses.reduce((acc, curr) => {
      const keys = Object.keys(curr);
      for (const key of keys) {
        acc[key] = curr[key].toApiDoc();
      }
      return acc;
    }, {} as OpenAPIV3_1.ResponsesObject);
    return this;
  }

  operation(...operations: Operation<ParamKeys, QueryKeys>[]) {
    this._operation = operations;
    return this;
  }

  private get _parameters() {
    const params = [] as OpenAPIV3_1.ParameterObject[];

    for (const key of Object.keys(this._params)) {
      const p = this._params[key as ParamKeys];
      params.push({
        in: "path",
        name: key,
        schema: {
          type: p.type,
        },
        required: p.required,
        description: p.description,
      });
    }

    for (const key of Object.keys(this._queryParams)) {
      const p = this._queryParams[key as QueryKeys];
      params.push({
        in: "query",
        name: key,
        schema: {
          type: p.type,
        },
        required: p.required,
        description: p.description,
      });
    }

    return params;
  }

  get doc(): OpenAPIV3_1.OperationObject {
    return {
      summary: this._summary,
      description: this._description,
      tags: this._tags,
      responses: this._responses,
      parameters: this._parameters,
    };
  }

  get express(): Operation<ParamKeys, QueryKeys>[] {
    return this._operation;
  }
}
