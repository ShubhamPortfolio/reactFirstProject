// App.js
import React, {  useCallback, useReducer, useState } from 'react';
import './App.css';
import PlayButton from './components/PlayButton';
import Image from './components/Image';
import AddVideo from './components/AddVideo';
import VideoList from './components/Videolist';
import ThemeContext from './context/ThemeContext';
import VideosContext from './context/VideosContext';
import VideoDispatchContext from './context/VideoDispatchContext';
import Counter from './components/Counter';
function App() {
  const initialImages = [
    {
      id:1,
      verified: true,
      title: 'React Js',
      views: '1m',
      time: '1 year ago',
      channel: 'coderDost',
    },
    {
      id:2,

      verified: false,
      title: 'Mongo Db',
      views: '100k',
      time: '1 Month ago',
      channel: 'coderDost',
    },
    {
      id:3,
      verified: true,
      title: 'Node JS',
      views: '999k',
      time: '1 year ago',
      channel: 'coderDost',
    },
  ];

  //const themeContext = useContext(ThemeContext)

  const [editableVideo, setEditableVideo] = useState(null);
  const [mode,setMode]=useState('darkMode')


  function videoReducer(images,action){
    switch(action.type){

      case 'LOAD':
        return action.payLoad;

      case 'ADD':
        return[
          ...images,
          {...action.payLoad,id:images.length + 1}
        ]
        case 'DELETE':
        return images.filter(Image=>Image.id!==action.payLoad)

        case 'UPDATE':
          const index = images.findIndex(v=>v.id===action.payLoad.id)
          const newImages=[...images]
          newImages.splice(index,1,action.payLoad)
          setEditableVideo(null);
          return newImages;
        default:
          return images
    }
  }
  const [images,dispatch]=useReducer(videoReducer,[])

  
  const editVideo = useCallback(
    function editVideo(id){
      setEditableVideo(images.find(Image=>Image.id===id))
    },[images])
  
  

  

  return (
    
    <ThemeContext.Provider value={mode}>

      <VideosContext.Provider value={images}>
        <VideoDispatchContext.Provider value={dispatch}>
    <div className={`App ${mode}`} onClick={() => console.log('App')}>
    <button className="modeButton" onClick={()=>setMode(mode==='darkMode'? 'lightMode': 'darkMode')}>Mode</button>

      <AddVideo   editableVideo={editableVideo}></AddVideo>
      <VideoList  editVideo={editVideo} ></VideoList>
     
    </div>

    </VideoDispatchContext.Provider>
    </VideosContext.Provider>
    </ThemeContext.Provider>
  ); 
}

export default App;
