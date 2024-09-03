import http from "k6/http";
import { check, sleep } from "k6";

// define configuration
export const options = {
  // define scenarios
  scenarios: {
    breaking: {
      executor: "ramping-vus",
      stages: [
        { duration: "10s", target: 20 },
        { duration: "10s", target: 40 },
        { duration: "10s", target: 80 },
        { duration: "10s", target: 150 },
        { duration: "10s", target: 180 },
        { duration: "10s", target: 220 },
        { duration: "20s", target: 240 },
        { duration: "20s", target: 300 },
      ],
    },
  },
};

export default function () {
  // define URL and request body
  const url = "http://127.0.0.1:8000/brand/customer";

  // send a get request and save response as a variable
  const res = http.get(url);

  // check that response is 200
  check(res, {
    "response code was 200": (res) => res.status == 200,
  });

  sleep(1);
}
