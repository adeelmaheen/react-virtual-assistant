import React, { useState, createContext, useEffect } from "react";
import { run } from "../gemini";  // Ensure the path is correct

export const datacontext = createContext();

function UserContext({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState("listening...");
  const [response, setResponse] = useState(false);

  // Function to handle speech synthesis
  function speak(text) {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.volume = 1;
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.lang = "en-GB";
    window.speechSynthesis.speak(textSpeak);
  }

  // Function to handle AI responses
  async function aiResponse(userPrompt) {
    try {
      const aiText = await run(userPrompt);
      const sanitizedText = aiText
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/google/gi, "Maheen Arif");
      setPrompt(sanitizedText);
      speak(sanitizedText);
      setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } catch (error) {
      console.error("AI Response Error:", error);
      setPrompt("Sorry, I couldn't process that.");
      speak("Sorry, I couldn't process that.");
      setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    }
  }

  useEffect(() => {
    // Check for SpeechRecognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please use a compatible browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setPrompt(transcript);
      takeCommand(transcript.toLowerCase());
    };

    recognition.onerror = (e) => {
      console.error("Speech Recognition Error:", e.error);
      setPrompt("Sorry, I didn't catch that.");
      speak("Sorry, I didn't catch that.");
      setResponse(true);
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    };

    // Start recognition when speaking is true and prompt is "listening..."
    if (speaking && prompt === "listening...") {
      recognition.start();
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      recognition.abort();
    };
  }, [speaking, prompt]);

  // Function to handle voice commands
  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("opening YouTube");
      setResponse(true);
      setPrompt("Opening YouTube...");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("opening Google");
      setResponse(true);
      setPrompt("Opening Google...");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("opening Instagram");
      setResponse(true);
      setPrompt("Opening Instagram...");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("time")) {
      const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
      speak(time);
      setResponse(true);
      setPrompt(time);
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("date")) {
      const date = new Date().toLocaleString(undefined, { day: "numeric", month: "numeric" });
      speak(date);
      setResponse(true);
      setPrompt(date);
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("open") && command.includes("facebook")) {
      window.open("https://www.facebook.com/", "_blank");
      speak("opening Facebook");
      setResponse(true);
      setPrompt("Opening Facebook...");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("open") && command.includes("snapchat")) {
      window.open("https://www.snapchat.com/", "_blank");
      speak("opening Snapchat");
      setResponse(true);
      setPrompt("Opening Snapchat...");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("open") && command.includes("linkedin")) {  // Corrected spelling
      window.open("https://www.linkedin.com/", "_blank");  // Corrected URL
      speak("opening LinkedIn");
      setResponse(true);
      setPrompt("Opening LinkedIn...");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("open") && command.includes("tiktok")) {
      window.open("https://www.tiktok.com/", "_blank");
      speak("opening TikTok");
      setResponse(true);
      setPrompt("Opening TikTok...");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("open") && command.includes("whatsapp")) {
      window.open("https://www.whatsapp.com/", "_blank");
      speak("opening WhatsApp");
      setResponse(true);
      setPrompt("Opening WhatsApp...");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else if (command.includes("open") && command.includes("chatgpt")) {
      window.open("https://www.openai.com/chatgpt", "_blank");  // Corrected URL
      speak("opening ChatGPT");
      setResponse(true);
      setPrompt("Opening ChatGPT...");
      setTimeout(() => {
        setSpeaking(false);
      }, 3000);
    } else {
      aiResponse(command);
    };
  }

  // Context value to provide to consumers
  const value = {
    recognition: null,  // Removed as recognition is handled within useEffect
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
