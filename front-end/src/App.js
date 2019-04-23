import React, { Component } from 'react';
import TitleBar from "./components/TitleBar"
import "tachyons";
import CardList from "./components/CardList";
import SearchBox from "./components/SearchBox";
import Scroll from "./components/Scroll";
import LoginForm from "./components/LoginForm";
import UploadForm from "./components/UploadForm";
import {searchArt,requestArt,requestView,requestLogin} from "./redux/actions.js";
import {connect} from "react-redux";
import "./App.css";


const mapStateToProps = state=>{
  return {
    art:state.requestArt.art,
    searchField:state.searchArt.searchField,
    isPending:state.requestArt.isPending,
    error:state.requestArt.error,
    view: state.requestView.view,
    loginMessage: state.requestView.message
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onSearchChange:(event)=>dispatch(searchArt(event.target.value)),
    onRequestArt:()=>dispatch(requestArt()),
    onRequestView:(viewName)=>dispatch(requestView(viewName)),
    onRequestLogin:(inputDetails)=>dispatch(requestLogin(inputDetails))
  }

}

class App extends Component {


  componentDidMount(){
    this.props.onRequestArt();
    this.props.onRequestView();
  }

  render() {

    const {art,view,searchField,onSearchChange,onRequestView,onRequestLogin,loginMessage}=this.props;
    console.log(art);
    const filteredArt = art.filter(art=>{
      return art.artname.toLowerCase().includes(searchField.toLowerCase())

    })
    const onRequestUploadView = ()=>{
      onRequestView("upload");
    };



    return (
      <div className="App">
      {
        view==="upload"?
        <div>
        <h1>Upload</h1>
        <p>{loginMessage.message}</p>
        <UploadForm token={loginMessage.token} />
        </div>
        :
        view==="main"?
        <div>
            <div className="topbar">
            <div className="topbar-main">
            <TitleBar />
            <SearchBox  searchChange={onSearchChange}/>
            </div>

            <button onClick={onRequestUploadView}>Upload</button>

        </div >
        <Scroll>
            <CardList art={filteredArt}/>
        </Scroll></div>:
        view==="login"?
        <div>
        <h1>Login/Register</h1>
        <LoginForm onRequestLogin={onRequestLogin}/>


        </div>:

        <h1></h1>
      }




      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
