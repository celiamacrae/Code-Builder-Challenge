import React from 'react'

const Timer = props => {
    console.log(props)
    const seconds = props.seconds
    return (
        <div className='box'>
         <div id="control">
          <div className="inputGroup"> 
              <input ref={props.secondsInput} type="number"  max={10} min={0} placeholder={10}  name="seconds"  onChange={props.inputHandler} />
          </div>
          <div id='timer_buttons'>
              <button onClick={props.startTimer} disabled={!props.trigger} className="start">start</button>
              <button onClick={props.stopTimer}  disabled={!props.trigger} className="stop">stop</button>
              <button onClick={props.resetTimer}  disabled={!props.trigger} className="reset">reset</button>
          </div>
         </div>
         {seconds < 10 ? (
           <h1 id='timer'>0:0{seconds}</h1>
         ): (
          <h1 id='timer'>0:{seconds}</h1>
         )}
         </div>
    )
}

export default Timer