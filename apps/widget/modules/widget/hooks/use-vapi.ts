import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
    role: "user" | "assistant"
    text: string
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        // Only for testing the Vapi API, otherwise customer will provide there own API keys.
        const vapiInstance = new Vapi("a8f337e5-591c-43e5-b3e5-2e79c4c627b6")
        setVapi(vapiInstance)

        vapiInstance.on("call-start", () => {
            setIsConnected(true)
            setIsConnecting(true)
            setTranscript([])
        })

        vapiInstance.on("call-end", () => {
            setIsConnected(false)
            setIsConnecting(false)
            setIsSpeaking(false)
        })

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true)
        })

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false)
        })

        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR")
            setIsConnected(false)
        })

        vapiInstance.on("message", (message) => {
            if(message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role === "user" ? "user" : "assistant",
                        text: message.transcript
                    }
                ])
            }
        })

        return () => {
            vapiInstance?.stop()
        }
    }, [])

    const startCall = () => {
        setIsConnecting(true)

        if(vapi) {
            // Only for testing the Vapi API, otherwise customer will provide their own API keys.
            vapi.start("5d4c5c96-df6d-45fb-a0df-8de3168a9365")
        }
    } 
    
    const endCall = () => {
        if(vapi) {
            vapi.stop()
        }
    }

    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall
    }
}