
# 01. Performance Test (성능 테스트)

- 이 프로젝트는 k6를 사용하여 다양한 조건에서 자동화된 테스트를 할 수 있는 스크립트를 모아둔다. 

- API 서버의 성능을 측정하고 분석하는 데 중점을 둔다. 

- 이 과정을 통해 시스템의 안정성과 처리 능력을 검증할 수 있다.
<br>

# 02. 시작 가이드

## (1) 요구 사항
- Docker
- k6

## (2) 설치 및 실행
1. 리포지토리를 클론한다:
   ```bash
   git clone https://github.com/dhwpdnr/performance_test.git
   ```
2. Docker로 테스트를 실행한다:
   ```bash
   docker-compose up
   ```
3. k6로 스크립트를 실행한다:
   ```bash
   k6 run script.js
   ```
