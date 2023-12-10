/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OpenAPIV3_1 } from "openapi-types";
import { Base } from "./Base";
import Route from "./Route";
import { Method } from "@/types/Route";

export default class ApiDoc extends Base<OpenAPIV3_1.Document> {
  constructor(doc = {}) {
    super(doc);
    this._doc.openapi = "3.1.0";
  }

  server(server?: { url: string; description: string }) {
    if (!this._doc.servers) this._doc.servers = [];

    if (server) {
      this._doc.servers?.push(server);
    }
    return this;
  }

  version(version: string) {
    this.verifyInfo();
    // @ts-ignore
    this._doc.info.version = version;
    return this;
  }

  title(title: string) {
    this.verifyInfo();
    // @ts-ignore
    this._doc.info.title = title;
    return this;
  }

  description(description: string) {
    this.verifyInfo();
    // @ts-ignore
    this._doc.info.description = description;
    return this;
  }

  contact(contact: OpenAPIV3_1.ContactObject) {
    this.verifyInfo();
    // @ts-ignore
    this._doc.info.contact = contact;
    return this;
  }

  license(license: OpenAPIV3_1.LicenseObject) {
    this.verifyInfo();
    // @ts-ignore
    this._doc.info.license = license;
    return this;
  }

  _addPath(method: Method, path: string, route: Route) {
    if (!this._doc.paths) this._doc.paths = {};
    const paths: OpenAPIV3_1.PathsObject = this._doc.paths;

    if (!this._doc.paths[path]) {
      paths[path] = { [method]: route.doc() ? route.doc() : {} };
    } else {
      // @ts-ignore
      this._doc.paths[path][method] = route.doc() ? route.doc() : {};
    }
  }

  private verifyInfo() {
    if (!this._doc.info) this._doc.info = {} as OpenAPIV3_1.InfoObject;
  }
}
