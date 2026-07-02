# FFXIV Market Dashboard

파이널판타지14 글로벌 서버의 거래 게시판 시세를 조회하고 비교하는 웹 대시보드입니다.


## 왜 만들었나요

파이널판타지14를 플레이하며 서버별 시세를 비교할 도구가 필요하다고 느꼈고,
실무에서 다뤘던 프론트엔드 기술을 활용해 직접 만들어보고 싶었습니다.


## 주요 기능

- 아이템 이름으로 검색 (디바운스 적용)
- 서버별 실시간 최저가 비교
- 가격 추이 차트
- 거래 히스토리 조회


## 기술 스택

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- XIVAPI, Universalis (외부 API)


## 구조

types → lib → hooks → components → app 순서로 계층을 나눠
API 응답 변경에 컴포넌트가 영향받지 않도록 설계했습니다.


## 트러블슈팅

- Universalis는 응답 시간 단위가 ms인데 내부 유틸은 초 단위를 기대해서 변환 로직 추가
- 여러 서버 가격을 동시에 조회할 때 Promise.all 대신 Promise.allSettled를 사용해 일부 서버 장애 시에도 나머지 결과를 보여주도록 처리


## 실행 방법

​```bash
npm install

npm run dev
​```


## 아쉬운 점

- 한국 서버는 공식 API가 없어 글로벌 서버만 지원
- 재료 시세 합산 계산기 기능 추가 예정
