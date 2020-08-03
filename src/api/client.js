// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

import * as Sentry from "@sentry/browser";

const BASE_URL = "https://testapply.acrrm.org.au";

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await window.fetch(`${BASE_URL}${endpoint}`, config);
  // TODO: accept array of expected non success codes
  if (response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      let data = await response.text();
      if (!data) {
        return response.status;
      }
    }
  } else {
    Sentry.captureException(response);
    // TODO: might be able to send other data
    return Promise.reject(response.status);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};
