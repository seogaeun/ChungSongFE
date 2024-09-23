// src/store/reducers/index.js
import { combineReducers } from 'redux';
import yourReducer from './yourReducer'; // 실제 리듀서 파일로 변경할 부분.

const rootReducer = combineReducers({
  yourReducer,
  // 다른 리듀서들을 추가할 부분
});

export default rootReducer;
