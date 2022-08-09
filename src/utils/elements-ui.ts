import { OpenAPIV3_1 } from "openapi-types";

export const render = function render(apiDocs: OpenAPIV3_1.Document) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>${apiDocs.info.title}</title>
  
    <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
  </head>
  <body style="height: 100vh;">
    <elements-api id="docs" router="hash" layout="sidebar"></elements-api>
    <script>
      (async () => {
        const docs = document.getElementById('docs');
        docs.apiDescriptionDocument = ${JSON.stringify(apiDocs)};
      })();
    </script>
  </body>
</html>`;
};
