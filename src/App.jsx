import React, { useEffect } from 'react';
import './App.css';
import va from './assets/ai.png';
import speak from './assets/speak.gif';
import aigif from './assets/aiVoice.gif';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { datacontext } from './context/UserContext';  

const App = () => {
  const { 
    speaking,
    setSpeaking,
    prompt,
    response,
    setPrompt,
    setResponse,
  } = useContext(datacontext);

  const handleClick = () => {
    setPrompt("listening...");
    setSpeaking(true);
    setResponse(false);
  };

  return (
    <div className='main'>
      <img src={va} alt="AI Assistant" id='shifra'/>
      <span>I'm Shifra, Your Advanced Virtual Assistant</span>
      {!speaking ? (
        <button onClick={handleClick}>Click Here <FaMicrophoneAlt /></button>
      ) : (
        <div className="response">
          {!response ? (
            <img src={speak} alt="Listening" className="speak-img"/>
          ) : (
            <img src={aigif} alt="AI Response" className="aigif-img"/> 
          )}
          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
};

export default App;
