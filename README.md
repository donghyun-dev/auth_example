# auth_example

expressjs로 jwt 토큰 기반 인증 시스템을 실습을 위한 프로젝트입니다. 

<br>  

## 실습방법

### 우선 프로젝트를 clone해줍니다.  
<br>

```bash
git clone https://github.com/donghyun-dev/auth_example.git

```

### FrontEnd 실행방법

### 필요한 패키지를 설치해줍니다.
client 폴더에서 아래와 같이 명령어를 입력해줍니다.
```bash

yarn install
```

### 실행해줍니다.

```bash

yarn start
```

<hr>   

<br>

### Backend 실행방법

### 필요한 패키지를 설치해줍니다.

root 폴더에서 아래와 같이 명령어를 입력해줍니다.
```bash

yarn install
```

### 그 다음 dev.js 파일을 생성해서 아래와 같이 연결할 몽고디비 url를 적어줍니다.   

```javascript
module.exports = {
  mongoURL: 'MongDB_URL 입력해주세요.',
};
```

<br>

### 실행해줍니다.

```bash
yarn backend # server만 실행
yarn frontend # frontend만 실행
yarn dev # server + frontend 동시 실행
```
