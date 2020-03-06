# Middy sqs json body parsing middleware

<div align="center">
  <img alt="Middy logo" src="https://raw.githubusercontent.com/middyjs/middy/master/img/middy-logo.png"/>
</div>

<div align="center">
  <p><strong>SQS batch json body parsing middleware for the middy framework, the stylish Node.js middleware engine for AWS Lambda</strong></p>
</div>

<div align="center">
<p>
  <a href="http://badge.fury.io/js/%40middy%2Fsqs-partial-batch-failure">
    <img src="https://badge.fury.io/js/%40middy%2Fsqs-partial-batch-failure.svg" alt="npm version" style="max-width:100%;">
  </a>
  <a href="https://snyk.io/test/github/middyjs/middy">
    <img src="https://snyk.io/test/github/middyjs/middy/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/middyjs/middy" style="max-width:100%;">
  </a>
  <a href="https://standardjs.com/">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard Code Style"  style="max-width:100%;">
  </a>
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/middyjs/middy.svg" alt="Greenkeeper badge"  style="max-width:100%;">
  </a>
  <a href="https://gitter.im/middyjs/Lobby">
    <img src="https://badges.gitter.im/gitterHQ/gitter.svg" alt="Chat on Gitter"  style="max-width:100%;">
  </a>
</p>
</div>

Middleware for iterating through a SQS batch of records and parsing the string body to a JSON body.

## Install

To install this middleware you can use NPM:

```bash
npm install --save @middy/sqs-json-body-parser
```

## Options

 - `reviver` (function) (optional): A function to be passed as the reviver for [JSON.parse(text[, reviver])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON). If safeParse is provided then reviver will be passed to it and it is up the provided safeParse function to use it or ignore it.
 - `safeParse` (function) (optional): A provided function to be used inplace of the default safeParse function for custom parsing logic on each record body in the batch. As an example the following represents the default safeParse function:
 ```javascript
const safeParse = (body, reviver) => {
  try {
    return JSON.parse(body, reviver)
  } catch (err) {
    return body
  }
}
 ```

## Sample usage

```javascript
const middy = require('@middy/core')
const sqsJsonBodyParser = require('@middy/sqs-json-body-parser')

const yourHandler = (event, context, cb) => {
  const { Records } = event
  return Promise.all(Records.map(async (record, index) => { /* your message processing logic */ }))
}

const handler = middy(yourHandler).use(sqsJsonBodyParser())
```

## Middy documentation and examples

For more documentation and examples, refers to the main [Middy monorepo on GitHub](https://github.com/middyjs/middy) or [Middy official website](https://middy.js.org).


## Contributing

Everyone is very welcome to contribute to this repository. Feel free to [raise issues](https://github.com/middyjs/middy/issues) or to [submit Pull Requests](https://github.com/middyjs/middy/pulls).


## License

Licensed under [MIT License](LICENSE). Copyright (c) 2017-2018 Luciano Mammino and the [Middy team](https://github.com/middyjs/middy/graphs/contributors).

<a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fmiddyjs%2Fmiddy?ref=badge_large">
  <img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmiddyjs%2Fmiddy.svg?type=large" alt="FOSSA Status"  style="max-width:100%;">
</a>
