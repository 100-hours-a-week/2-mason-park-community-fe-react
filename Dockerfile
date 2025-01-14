# Stage 1: React 빌드
FROM node:18-slim AS react

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 설치를 위해 package.json과 package-lock.json만 복사 (캐싱 최적화)
COPY app/package.json app/package-lock.json ./

# 종속성 설치
RUN npm ci

# 소스 코드 전체 복사
COPY app ./

# 빌드
RUN npm run build

# Stage 2: Express 서버
FROM node:18-slim

WORKDIR /client

# 패키지 파일 복사
COPY server/package.json server/package-lock.json ./

# 종속성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY server/app.js ./app.js

# React 빌드 파일 복사
COPY --from=react /app/build ./build

# 포트 설정
EXPOSE 3000

# Express 서버 실행
CMD ["node", "app.js"]
