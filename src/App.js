// import React, { useEffect, useState } from "react";
import React from 'react';
import './App.css';
import DebugOutput from './DebugOutput'
import Timer from './Timer'
import Trigger from './Trigger'
import ConnectLine from './ConnectLine'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds:10,
      trigger: false,
      hasTimer: false,
      timerOutput: false
    }
    this.secondsInput = React.createRef();
    this.handleToggle = this.handleToggle.bind(this)
    this.addTimerBlock = this.addTimerBlock.bind(this)
  }

  inputHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  startTimer = () => {
    if(this.state.hasTimer){
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = async () => {
    const  { seconds } = this.state;

    if(seconds > 0) {
      await this.setState({seconds: seconds-1})

      if(this.state.seconds === 0){
        await this.setState({timerOutput: true})
      }  
    }else if(seconds === -1){
      await this.setState({timerOutput: false})
    }
    else {
      clearInterval(this.timer);
    }
  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({
      seconds: 10
    });
    this.secondsInput.current.value = 10;
  }

  async handleToggle(){
    let newTrigger = !this.state.trigger
    await this.setState({trigger: newTrigger})
    
    if(this.state.trigger){
      this.startTimer()
    }
  }

  async addTimerBlock(){
    let newTimer = !this.state.hasTimer
    await this.setState({hasTimer: newTimer})
    if(! this.state.hasTimer){
      this.resetTimer()
    }else{
      this.startTimer()
    }
    
  }

  render() {
    const {seconds } = this.state;
    return (
      <div id='container'>
        <button id="addrm_timer" onClick={this.addTimerBlock}>Add/ Remove Timer</button>
    
        <div className="App">
          <Trigger trigger={this.state.trigger} handleToggle={this.handleToggle}/>
          <ConnectLine />
          {this.state.hasTimer ? (   
            <Timer secondsInput={this.secondsInput} startTimer={this.startTimer} inputHandler={this.inputHandler} seconds={this.state.seconds} stopTimer={this.stopTimer} resetTimer={this.resetTimer}/>          
          ): (
            <ConnectLine />
          )}
          <ConnectLine />

          <DebugOutput trigger={this.state.trigger} />
        </div>
      </div>
    );
  }
}

export default App;
