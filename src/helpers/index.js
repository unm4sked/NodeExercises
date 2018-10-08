const { isEmpty } = require('lodash');

const parseResponse = (response) => {
  if (isEmpty(response)) {
    return null;
  }

  return JSON.stringify(response, null, 2);
}

module.exports.buildResponse = (input, output) => `
<strong>output</strong>
<pre>
${parseResponse(output)}
</pre>
<strong>input</strong>
<pre>
${parseResponse(input)}
</pre>
`;