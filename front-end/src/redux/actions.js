import {SEARCH_ART,REQUEST_ART_FAILED,REQUEST_ART_PENDING,REQUEST_ART_SUCCESS,REQUEST_UPLOAD_PAGE,REQUEST_LOGIN_PENDING,REQUEST_LOGIN_SUCCESS,REQUEST_LOGIN_FAILED} from "./constants.js";


export const searchArt = (text,art) => ({
  type:SEARCH_ART,
  payload: text
})
export const requestLogin = (inputDetails)=>(dispatch)=>{
  dispatch({type:REQUEST_LOGIN_PENDING});
  fetch("http://localhost:3001/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(inputDetails)})
  .then(response=>response.json())
  .then(data=>dispatch({type:REQUEST_LOGIN_SUCCESS,payload:data}))
  .catch(error=>dispatch({type:REQUEST_LOGIN_FAILED,payload:error}));

}
export const requestArt=() => (dispatch) => {
    dispatch({type:REQUEST_ART_PENDING});
    fetch("http://localhost:3001/art")
    .then(response=>response.json())
    .then(data=>dispatch({type:REQUEST_ART_SUCCESS,payload:data}))
    .catch(error=>dispatch({type:REQUEST_ART_FAILED,payload:error}));

}

export const requestView = (viewName="")=>(dispatch) => {
  switch (viewName) {
    case "upload":
      dispatch({type:REQUEST_UPLOAD_PAGE});
      break;
    default:

    }
}
