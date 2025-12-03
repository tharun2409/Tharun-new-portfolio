import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { RESUME_DATA } from '../types';
import { AudioVisualizer } from './AudioVisualizer';
import { MicrophoneIcon, StopIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

// --- Audio Helper Functions ---
function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = Math.max(-1, Math.min(1, data[i])) * 32767;
  }
  return new Blob([int16], { type: 'audio/pcm;rate=16000' });
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const VoiceAgent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModelSpeaking, setIsModelSpeaking] = useState(false);

  // Audio Context & Nodes
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputNodeRef = useRef<GainNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // System Instruction tailored to Tharun Balaji
  const systemInstruction = `
    You are the AI Voice Representative for Tharun Balaji.
    Your goal is to impress visitors with Tharun's skills, especially his expertise in AI Automation using n8n and his background in Marketing.
    
    Here is Tharun's Profile Data:
    ${JSON.stringify(RESUME_DATA)}

    Key talking points:
    1. You MUST mention his ability to build complex workflows using n8n for AI automation.
    2. He is currently pursuing a Master's in International Marketing in Paris.
    3. He combines creative design (visual comms) with technical AI implementation.
    
    Keep responses concise, professional, yet warm and engaging. Speak naturally.
    If asked for contact info, provide it verbally but suggest checking the footer.
  `;

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    sessionPromiseRef.current = null;
    setIsActive(false);
    setIsConnecting(false);
    setIsModelSpeaking(false);
  };

  const startSession = async () => {
    if (!process.env.API_KEY) {
      setError("API Key not found in environment.");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initialize Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
      outputAudioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
      
      inputNodeRef.current = inputAudioContextRef.current.createGain();
      outputNodeRef.current = outputAudioContextRef.current.createGain();
      outputNodeRef.current.connect(outputAudioContextRef.current.destination);

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: systemInstruction,
        },
        callbacks: {
          onopen: () => {
            console.log("Session opened");
            setIsConnecting(false);
            setIsActive(true);

            // Setup Input Processing
            if (!inputAudioContextRef.current || !streamRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
            const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData); // Convert Float32 to Int16 PCM Blob
              
              // Only send if session is established
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                    media: {
                        mimeType: 'audio/pcm;rate=16000',
                        data: pcmBlob // @google/genai SDK handles the base64 conversion internally if passed a Blob? 
                                      // Wait, the SDK example shows passing a Blob with data property being base64...
                                      // Actually, the prompt example shows:
                                      // return { data: encode(...), mimeType: ... }
                                      // So createBlob returns an object, NOT a browser Blob.
                } as any }); // Type assertion for our helper structure
              });
            };

            source.connect(processor);
            processor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio && outputAudioContextRef.current && outputNodeRef.current) {
               setIsModelSpeaking(true);
               // Simple debounce/timeout to turn off speaking visual after a bit if no new chunks come
               // In a real app we track duration, here we simplify.
               
               const ctx = outputAudioContextRef.current;
               nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
               
               const audioBuffer = await decodeAudioData(
                 decode(base64Audio),
                 ctx,
                 24000,
                 1
               );

               const source = ctx.createBufferSource();
               source.buffer = audioBuffer;
               source.connect(outputNodeRef.current);
               
               source.addEventListener('ended', () => {
                 sourcesRef.current.delete(source);
                 if (sourcesRef.current.size === 0) setIsModelSpeaking(false);
               });

               source.start(nextStartTimeRef.current);
               nextStartTimeRef.current += audioBuffer.duration;
               sourcesRef.current.add(source);
            }
          },
          onclose: () => {
            console.log("Session closed");
            cleanup();
          },
          onerror: (err) => {
            console.error("Session error", err);
            setError("Connection error. Please try again.");
            cleanup();
          }
        }
      });

      sessionPromiseRef.current = sessionPromise;

    } catch (err) {
      console.error("Failed to start session:", err);
      setError("Failed to access microphone or connect.");
      setIsConnecting(false);
    }
  };

  // Overwriting createBlob to match the Prompt's expectation of returning a plain object with base64 data
  function createBlob(data: Float32Array): any {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    // Simple manual btoa for the Int16 buffer
    let binary = '';
    const bytes = new Uint8Array(int16.buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);

    return {
      data: base64,
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {error && (
        <div className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg mb-2 max-w-xs animate-fade-in">
          {error}
        </div>
      )}

      {isActive && (
        <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl shadow-2xl w-72 mb-2 animate-slide-up">
           <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
                Gemini Live
              </span>
              <button 
                onClick={cleanup}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <StopIcon className="w-5 h-5" />
              </button>
           </div>
           
           <div className="mb-3">
              <AudioVisualizer isActive={isActive} isSpeaking={isModelSpeaking} />
           </div>
           
           <p className="text-xs text-slate-400 text-center">
             {isModelSpeaking ? "Tharun's AI is speaking..." : "Listening..."}
           </p>
        </div>
      )}

      <button
        onClick={isActive ? cleanup : startSession}
        disabled={isConnecting}
        className={`
          flex items-center gap-2 px-6 py-4 rounded-full font-bold shadow-xl transition-all duration-300
          ${isActive 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white'
          }
          ${isConnecting ? 'opacity-80 cursor-wait' : ''}
        `}
      >
        {isConnecting ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : isActive ? (
          <>
            <StopIcon className="w-6 h-6" />
            <span>End Chat</span>
          </>
        ) : (
          <>
            <SpeakerWaveIcon className="w-6 h-6 animate-pulse" />
            <span>Talk to AI Agent</span>
          </>
        )}
      </button>
    </div>
  );
};