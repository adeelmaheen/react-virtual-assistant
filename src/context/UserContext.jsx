import { useState, createContext, useContext } from "react";
import React from "react";
import { run } from "../gemini";  // Import run from gemini.js

export const datacontext = createContext();

function UserContext({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState("listening...");
  const [response, setResponse] = useState(false);

  function speak(text) {
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.volume = 1;
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.lang = "en-GB";
    window.speechSynthesis.speak(textSpeak);
  }

  async function aiResponse(prompt) {
    let text = await run(prompt);  // Use the imported run function here
    let newText = text.split("**") && text.split("*") && text.replace("google", "Maheen Arif") && text.replace("Google", "Maheen Arif");
    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 3000);
  }

  let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    setPrompt(transcript);
    takeCommand(transcript.toLowerCase());
  };

  function takeCommand(command) {
    if(command.includes("open") && command.includes("youtube")){
        window.open("https://www.youtube.com/","_blank")
        speak("opening YouTube")
        setResponse(true)
        setPrompt("Opening YouTube...")
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }else if(command.includes("open") && command.includes("google")){
        window.open("https://www.google.com/","_blank")
        speak("opening Google")
        setResponse(true)
        setPrompt("Opening Google...")
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }else if(command.includes("open") && command.includes("instagram")){
        window.open("https://www.instagram.com/","_blank")
        speak("opening Instagram")
        setResponse(true)
        setPrompt("Opening Instagram...")
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }else if(command.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
        setResponse(true)
        setPrompt(time)
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }
    else if(command.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"numeric"})
        speak(date)
        setResponse(true)
        setPrompt(date)
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }else if(command.includes("open") && command.includes("facebook")){
        window.open("https://www.facebook.com/","_blank")
        speak("opening Facebook")
        setResponse(true)
        setPrompt("Opening Facebook...")
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }else if(command.includes("open") && command.includes("snapchat")){
        window.open("https://www.snapchat.com/","_blank")
        speak("opening Snapchat")
        setResponse(true)
        setPrompt("Opening Snapchat...")
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }else if(command.includes("open") && command.includes("linkedln")){
        window.open("https://www.linkedln.com/","_blank")
        speak("opening Linkedln")
        setResponse(true)
        setPrompt("Opening Linkedln...")
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }else if(command.includes("open") && command.includes("tiktok")){
        window.open("https://www.tiktok.com/","_blank")
        speak("opening Tiktok")
        setResponse(true)
        setPrompt("Opening Tiktok...")
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }else if(command.includes("open") && command.includes("whatsapp")){
        window.open("https://www.whatsapp.com/","_blank")
        speak("opening Whatsapp")
        setResponse(true)
        setPrompt("Opening Whatsapp...")
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }else if(command.includes("open") && command.includes("chatgpt")){
        window.open("https://www.chatgpt.com/","_blank")
        speak("opening Chatgpt")
        setResponse(true)
        setPrompt("Opening Chatgpt...")
        setTimeout(()=>{
            setSpeaking(false)
        },3000)
    }
    else{
        aiResponse(command)
    }
    // Your existing command handling code
  }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  };

  return (
    <datacontext.Provider value={value}>
      {children}
    </datacontext.Provider>
  );
}

export default UserContext;
