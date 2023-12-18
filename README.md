
# Todo 목록을 추가 삭제 완료 가능한 사이트 구현

## lv1~lv5 까지 구현 완료.

### lv1 : prop-drilling만으로 기능 구현
### lv2 : rtk 사용해 기능 구현
### lv3 : json-server 사용해 기능 구현
### lv4 : reudxThunk를 사용해 기능 구현
### lv5 : react-query를 사용해 기능 구현




## 폴더 구조 (lv4기준)

```
 ┣ 📂public
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┣ 📜logo192.png
 ┃ ┣ 📜logo512.png
 ┃ ┣ 📜manifest.json
 ┃ ┗ 📜robots.txt
 ┣ 📂src  소스 코드가 있는 곳입니다. 이 폴더의 파일들이 프로젝트의 주요 기능을 담당합니다.
 ┃ ┣ 📂app
 ┃ ┃ ┗ 📜hooks.ts
 ┃ ┣ 📂components  React 컴포넌트들이 위치하는 폴더입니다.
 ┃ ┃ ┣ 📜Cards.tsx
 ┃ ┃ ┗ 📜Home.tsx
 ┃ ┣ 📂redux  Redux 상태 관리와 관련된 파일들이 위치합니다.
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┗ 📜configStore.ts
 ┃ ┃ ┗ 📂modules
 ┃ ┃ ┃ ┗ 📜todos.ts
 ┃ ┣ 📂types TypeScript 타입 정의 파일들이 위치합니다.
 ┃ ┃ ┗ 📜testType.ts
 ┃ ┣ 📜App.test.tsx
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜GloabalStyle.ts
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜logo.svg
 ┃ ┣ 📜react-app-env.d.ts
 ┃ ┣ 📜reportWebVitals.ts
 ┃ ┗ 📜setupTests.ts
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜db.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┗ 📜yarn.lock
```
