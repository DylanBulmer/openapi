/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OpenAPIV3_1 } from "openapi-types";
import { Base } from "./Base";

export default class ApiDoc extends Base<OpenAPIV3_1.Document> {
  constructor(doc = {}) {
    super(doc);
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

  private verifyInfo() {
    if (!this._doc.info) this._doc.info = {} as OpenAPIV3_1.InfoObject;
  }
}
