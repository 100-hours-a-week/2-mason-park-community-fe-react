# 1단계 React 빌드
FROM node:18-slim AS react

# 작업 디렉터리 설정
WORKDIR /app

# package.json 파일 복사
COPY package.json package-lock.json ./

# 종속성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# 빌드
RUN npm run build

# 2단계 Nginx
FROM busybox

# 작업 디렉터리 설정
WORKDIR /build

# 빌드 파일 복사
COPY --from=react /app/build .

ADD entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["sh", "/entrypoint.sh"]
