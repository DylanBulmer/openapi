# @dylanbulmer/openapi
[![Node.js Package](https://github.com/DylanBulmer/openapi/actions/workflows/npm-publish-github-packages.yml/badge.svg)](https://github.com/DylanBulmer/openapi/actions/workflows/npm-publish-github-packages.yml)

This is a lightweight OpenAPI middleware library for ExpressJS.

As of right now there is no documentation written, but I have added a working example in [examples/expressjs](/examples/expressjs) for you to work off.

## TODO:

- [ ] Create documentation
- [ ] Implement tests

## Getting started

The easiest way to get started is to download the example in this repository using `svn`. If you do not have `svn` installed, you can install it with the following command:

```bash
sudo apt install subversion
```

Next, `cd` into your projects directory if you have one, if not, cd to a location where you want to download the example. The following command will create a new directory named `express-openapi-example` and copy the example code from this repository.

```bash
cd path/to/projects

svn export https://github.com/DylanBulmer/openapi/trunk/examples/expressjs ./express-openapi-example
```

Now install the necessary packages with `yarn` or `npm`

```bash
yarn
# or
npm install
```

Once the packages have been installed, build and start the example!

```bash
yarn build
yarn start
# or
npm run build
npm start
```

The API routes are initialized from `src/api/index.ts`, all you need to do is add new files in the `src/api/routes/` directory to automagically generate new express routes.

You can build out your OpenAPI docs via the `src/api/api-doc.ts` file, but do not define paths in here, that is taken care of from the routes directory.

## FAQ

**Question:** Can you host multiple openapi docs at once?

> **Answer:** Yes! Another example will be produced showcasing this capability in the near future.
