import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { BrowserRouter } from 'react-router-dom';


export default class App extends Component{
    constructor(props){
        super(props);
        // this.state={
        // }
    }

    render() {
       return(
        <div className='center'>
            {/* center style */}
            <HomePage />
        </div>
       );
    }
}

const appDiv=document.getElementById("app");
render(<App name="Ye Xing"/>,appDiv);