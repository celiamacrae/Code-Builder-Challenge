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
    this.inputHandler = this.inputHandler.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.countDown = this.countDown.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.addTimerBlock = this.addTimerBlock.bind(this)
    this.timerOutput = this.timerOutput.bind(this)
    this.timerFalse = this.timerFalse.bind(this)
    this.secondsInput = React.createRef();
  }

  inputHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  startTimer = () => {
    if(this.state.trigger){
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = async () => {
    const  { seconds } = this.state;

    if(seconds > 0) {
      await this.setState({seconds: seconds-1})

      if(this.state.seconds === 0){
       this.timerOutput()
      }  
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
    if(this.state.hasTimer && this.state.trigger){
      this.startTimer()
    }
    if(this.state.hasTimer && !this.state.trigger){
      this.stopTimer()
      this.resetTimer()
    }
  }

  async addTimerBlock(){
    let newTimer = !this.state.hasTimer
    if(this.state.hasTimer){
      this.stopTimer()
      this.resetTimer()
    }else{
      this.startTimer()
    }
    await this.setState({hasTimer: newTimer})
  }

  async timerOutput(){
    await this.setState({timerOutput: true})
    setInterval(this.timerFalse, 1000);
  }

  async timerFalse(){
    await this.setState({timerOutput : false})
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
            <Timer secondsInput={this.secondsInput} startTimer={this.startTimer} inputHandler={this.inputHandler} seconds={this.state.seconds} stopTimer={this.stopTimer} resetTimer={this.resetTimer} trigger={this.state.trigger}/>          
          ): (
            <ConnectLine />
          )}
          <ConnectLine />

          <DebugOutput hasTimer={this.state.hasTimer} trigger={this.state.trigger} timerOutput={this.state.timerOutput}/>
        </div>
      </div>
    );
  }
}

export default App;
