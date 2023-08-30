import Response from "../Response";

const defaultDescription = `The HTTP \`204 No Content\` success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page.

This might be used, for example, when implementing "save and continue editing" functionality for a wiki site. In this case a [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) request would be used to save the page, and the \`204 No Content\` response would be sent to indicate that the editor should not be replaced by some other page.

A 204 response is cacheable by default (an [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) header is included in such a response).
([mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204))`;

const Response204 = new Response()
  .description(defaultDescription);
export default Response204;
