import {SEARCH_ART,REQUEST_ART_FAILED,REQUEST_ART_PENDING,REQUEST_ART_SUCCESS,REQUEST_UPLOAD_PAGE,REQUEST_LOGIN_SUCCESS,REQUEST_LOGIN_PENDING,REQUEST_LOGIN_FAILED} from "./constants.js";

const initialStateArt = {art:[],

                      isPending:false,
                      error:"",
                      searchField:""
}



const initialStateUser = {
  isPending:false,
  error:"",
  message:"",
  view:"main",
  loggedIn:false

}
export const requestView = (state=initialStateUser,action={}) => {
  switch(action.type){
    case REQUEST_LOGIN_PENDING:
      return {...state,isPending:true};
    case REQUEST_LOGIN_SUCCESS:
              if(action.payload.token){
                return {...state,message:action.payload,isPending:false,view:"upload",loggedIn:true};
              }else{
                return {...state,message:action.payload,isPending:false};
              }





    case REQUEST_LOGIN_FAILED:
      return {...state,error:action.payload,isPending:false};

    case REQUEST_UPLOAD_PAGE:
          console.log(state);
          if(state.loggedIn){

            return {...state,view:"upload"}
          }else{
            return {...state,view:"login"}
          }

    default:
      return state;

  }
}


export const searchArt = (state=initialStateArt,action={}) => {
  switch(action.type){
    case SEARCH_ART:
      return {...state,searchField:action.payload};
    default:
      return state;

  }
}

export const requestArt = (state=initialStateArt,action={}) => {
  switch(action.type){
    case REQUEST_ART_PENDING:
      return {...state,isPending:true};
    case REQUEST_ART_SUCCESS:
        return {...state,art:action.payload,isPending:false};
    case REQUEST_ART_FAILED:
      return {...state,error:action.payload,isPending:false};
    default:
      return state;

  }
}
