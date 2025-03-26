import React from 'react'
import image_01 from './Ghost.gif'

const Loading = () => {
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <img src={image_01} alt='loading.png' style={{
          height:'10%',
          margin:'auto',
          marginTop:'10%',

        }}/>
    </div>
  )
}

export default Loading
