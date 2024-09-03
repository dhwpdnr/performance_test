import http from "k6/http";
import { check, sleep, group } from "k6";
import { Counter, Rate } from "k6/metrics";

// 커스텀 메트릭 정의
const errorCount = new Counter("error_count");
const requestRate = new Rate("request_rate");

// 옵션 정의
export const options = {
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
  const url = "http://127.0.0.1:8000/brand/customer";

  group("GET /brand/customer", () => {
    const res = http.get(url);

    // 응답 코드가 200인지 체크
    const checkRes = check(res, {
      "response code was 200": (r) => r.status === 200,
      "response time was < 200ms": (r) => r.timings.duration < 200,
      "transaction time OK": (r) => r.timings.duration < 500,
    });

    // 요청 실패 시 로그 추가
    if (!checkRes) {
      errorCount.add(1); // 실패한 요청을 카운트
      console.error(`Request failed: ${res.status} ${res.body}`);
    }

    // 응답이 200이 아닌 경우 실패로 기록
    requestRate.add(res.status === 200);

    sleep(1);
  });
}
