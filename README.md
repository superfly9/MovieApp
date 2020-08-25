# Movie App

####
- 주소:https://react-movie-first.herokuapp.com/
####
![landing-page](https://github.com/superfly9/movieApp/blob/master/img/movieApp.gif)

### 사용한 것
- React/Redux/ES6
- MongoDB/Express

### 시도해 본것/어려웠던 것과 해결 과정
- 시도해본 것:userData/movieData 총 2가지의 큰 데이터를 다뤄야 함->component간 관계 아닌 redux state를 2개 사용
- 어려웠던 것:영화 검색시 페이지가 새로고침되면 redux state가 유지되지 않던 것
-  해결책: 처음엔 컴포넌트 간의 props를 통해 값을 영화 정보를 전달하려 함
 - 문제점: 하나의 컴포넌트가 아닌 여러개의 컴포넌트를 거쳐야 할 상황이 생김
-  redux의 state가 유지되게 하는 게 낫겠다 생각->redux persist를 사용해서 상태를 유지


### redux flow-chart
![landing-page](https://github.com/superfly9/movieApp/blob/master/img/reduxflow.png)
