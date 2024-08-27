import http from "k6/http";
import { check } from "k6";

export const options = {
  // Scenario setting
  scenarios: {
    payment_scenario: {
      executor: "per-vu-iterations", // Unique executor name
      vus: 100, // virtual users
      iterations: 1, // number of repetitions per VU
      exec: "test_scenario", // Name of the function to execute
    },
  },
};

export function setup() {
  // create tokens
  const tokens = login();
  return { tokens };
}

function login() {
  const url = "https://your-api-url.com/login"; // Define your login API URL
  const payload = JSON.stringify({
    email: "test@naver.com",
    userPwd: "0000",
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  const response = http.post(url, payload, params);

  check(response, {
    "login successful": (r) => r.status === 200,
  });

  const tokens = Array(100).fill(response.json().data.accessToken); // Assuming one token is enough for all users

  return tokens;
}

export function test_scenario(data) {
  const token = data.tokens[__VU - 1];

  // Example API call
  exampleRequest(token);
}

function exampleRequest(token) {
  const url = "https://your-api-url.com/api/example";
  const payload = JSON.stringify({
    testId: __VU, // Assuming each VU has a unique testId
    pg: "kcp.IP2RK",
    payMethod: "card",
  });

  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    "request successful": (r) => r.status === 200,
  });
}
