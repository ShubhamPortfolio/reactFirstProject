import Image from "./Image";
import PlayButton
 from "./PlayButton";
import useVideos from "../hooks/Videos";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import useVideoDispatch from "../hooks/Dispatch";
function VideoList({editVideo})
{
  const url="https://my.api.mockaroo.com/first_api.json?key=440472f0"
  const images = useVideos()
  const dispatch = useVideoDispatch();

  // async function handleClick(){
  //   const res=await axios.get(url);
  //   console.log('getImages',res.data)
  //   dispatch({type: 'LOAD',payLoad:res.data})
  // }

  useEffect(()=>{
    async function getVideos(){
      const res=await axios.get(url);
      console.log('getImages',res.data)
      dispatch({type: 'LOAD',payLoad:res.data})
    }
    getVideos();
  },[dispatch]);

    const play = useCallback(()=>console.log('Playing..'), []);
    const pause = useCallback(()=>console.log('Pause..'), []);
    const memoButton = useMemo(()=>(
      <PlayButton onPlay={play} onPause={pause}>
      Play
    </PlayButton>
    ),[pause, play]);
    

    return(
        <>
        {images.map((image) => (
            <Image
              key={image.id}
              verified={image.verified}
              title={image.title}
              views={image.views}
              time={image.time}
              channel={image.channel}
              id={image.id}
              editVideo={editVideo}
              
            >
              {memoButton}
            </Image>
          ))}
          
          </>
    )
}

export default VideoList;
