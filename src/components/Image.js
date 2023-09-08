import { useContext, useEffect, memo } from 'react';
import './Image.css'
import ThemeContext from '../context/ThemeContext';
import useVideoDispatch from '../hooks/Dispatch';



const Image = memo (function Image ({title,id,channel, views, time, verified,children,editVideo})
{
  const theme = useContext(ThemeContext)
  const dispatch=useVideoDispatch ();


  // useEffect(()=>{
  //  const idx= setInterval(()=>{
  //     console.log('video Playing', id)

  //   },3000)

  //   return()=>{
  //     clearInterval(idx)
  //   }

 // },[id])

    return (
        
    <>
    <div className={`container ${theme}`}>
      <button className='close'onClick={()=>    dispatch({type:'DELETE',payLoad:id})
      }>x</button>
      <button className='edit'onClick={()=>editVideo(id)}>Edit</button>

    <div className="pic">
    <img
      src={`https://picsum.photos/id/${id}/100/50/`}
      alt="Katherine Johnson"
    />
    </div>
       
    <div className="title" >{title}</div>
    <div className="channel" >{channel} {verified && '✅' }</div>
    <div className="views" >{views} views <span>.</span> {time}
    </div>
    <div>
      {children}
    </div>
    </div>
    </>

    )
}) 

export default Image;