import React from 'react'

const DebugOutput = props => {
    return (
        <div className='box'>
            {props.trigger === true ? (
                <h1>True</h1>
            ) : (
                <h1>False</h1>
            )}
        </div>
    )
}

export default DebugOutput