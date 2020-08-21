# Movie App

#### 여기에 사진 

### 사용한 것
- React/Redux/ES6
- MongoDB/Express

### 어려웠던 것과 해결 과정
- 어려웠던 것:영화 검색시 페이지가 새로고침되면 redux state가 유지되지 않던 것
-  해결책: 처음엔 컴포넌트 간의 props를 통해 값을 영화 정보를 전달하려 함
 - 문제점: 하나의 컴포넌트가 아닌 여러개의 컴포넌트를 거쳐야 할 상황이 생김
-  redux의 state가 유지되게 하는 게 낫겠다 생각->redux persist를 사용해서 상태를 유지


