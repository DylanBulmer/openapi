import { default as Response200 } from "./200";
import { default as Response201 } from "./201";
import { default as Response204 } from "./204";
import { default as Response400 } from "./400";
import { default as Response401 } from "./401";
import { default as Response403 } from "./403";
import { default as Response404 } from "./404";
import { default as Response418 } from "./418";
import { default as Response500 } from "./500";
import { default as Response503 } from "./503";

const Response = {
  200: Response200,
  201: Response201,
  204: Response204,
  400: Response400,
  401: Response401,
  403: Response403,
  404: Response404,
  418: Response418,
  500: Response500,
  503: Response503,
};

export default Response;
