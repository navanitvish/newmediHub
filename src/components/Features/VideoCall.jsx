"use client"

import { useState, useEffect, useRef } from "react"
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Users, ArrowLeft } from "lucide-react"
import { useLocation,  } from 'react-router-dom';
const VideoCallComponent = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [participants, setParticipants] = useState([])
  const [isInCall, setIsInCall] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState("")
  const location = useLocation();

  // Refs for video elements and EnableX
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const enxRoomRef = useRef(null)
  const localStreamRef = useRef(null)
  const remoteStreamsRef = useRef(new Map())

  // Mock location state for demo - in real app this would come from React Router
  // const mockLocationState = {
  //   doctor: { id: "doc123", name: "Dr. Smith" },
  //   consultationType: "video", // or 'audio'
  //   fromSpecialty: { id: "spec456", name: "Cardiology" },
  //   receiverId: "679369be4f28069267f26ed3", // Add receiverId to mock data
  // }

  // Extract parameters from location state (using mock data for demo)
  const { doctor, consultationType, fromSpecialty  } = location.state || {};
  console.log('Doctor nv Data:', doctor);  

  const doctorId = doctor?.id || ""
  const specialtyId = fromSpecialty?.id || ""
  const specialtyName = fromSpecialty?.name || "General"
  console.log("Received data:", { doctorId, specialtyId, specialtyName })

  // Determine call type based on consultation type
  const callType = consultationType === "video" ? "video" : "audio"

  // Initialize EnableX when component mounts
  useEffect(() => {
    console.log("EnableX SDK should be loaded via script tag in your HTML")

    // Auto-join call when component mounts if we have required data
    if (doctorId && consultationType) {
      console.log("Ready to join call for:", { doctorId, consultationType, specialtyName })
    }
  }, [doctorId, consultationType, specialtyName])

  // Retry mechanism for failed calls
  const retryCall = async (maxRetries = 3, delay = 2000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Call attempt ${attempt}/${maxRetries}`)
        await joinCall()
        return // Success, exit retry loop
      } catch (error) {
        console.error(`Call attempt ${attempt} failed:`, error)

        if (attempt === maxRetries) {
          throw error // Final attempt failed
        }

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  const getToken = async (callType) => {
    try {
      // For development/demo mode
      if (process.env.NODE_ENV === "development" && !window.fetch) {
        return "mock-token-" + Math.random().toString(36).substring(7)
      }

      // Ensure we have required data
      if (!doctorId) {
        throw new Error("Receiver ID is required")
      }

      // NEW – if nothing in localStorage, use a harmless fallback value
      const authToken = (typeof window !== "undefined" && localStorage.getItem("smartmeditoken")) || "demo-token"
      if (authToken === "demo-token") {
        console.warn(
          "No auth token found in localStorage → using demo-token fallback (suitable for local preview only).",
        )
      }

      console.log("Requesting token with payload:", {
        callType,
        doctorId: doctorId || "unknown",
        specialtyId: specialtyId || "unknown",
      })

      const requestPayload = {
        doctorId: doctorId,
        callType: callType, // "video" or "audio"
        ...(doctorId && { doctorId }),
        
      }

      const response = await fetch("https://medisewa.onrender.com/api/v1/calls/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken && authToken !== "demo-token" ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(requestPayload),
      })

      console.log("API Response status:", response.status)

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text()
        console.error("Non-JSON response:", textResponse)
        throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log("API Response data:", data)

      // Check for various error conditions
      if (!response.ok) {
        const errorMessage =
          data.message || data.error || data.details || `HTTP ${response.status}: ${response.statusText}`
        console.error("API Error Response:", data)
        throw new Error(errorMessage)
      }

      // Check if response indicates success
      if (data.success === false) {
        const errorMessage = data.message || data.error || "API request failed"
        console.error("API returned success: false:", data)
        throw new Error(errorMessage)
      }

      // Validate token in response
      if (!data.token) {
        console.error("No token in successful response:", data)
        throw new Error("No token received from server")
      }

      console.log("Token received successfully")
      return data.token
    } catch (error) {
      console.error("Error in getToken:", error)

      // Provide more specific error messages
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error("Network error: Unable to connect to server. Please check your internet connection.")
      }

      if (error.message.includes("Authentication token not found")) {
        throw new Error("Please log in again to continue.")
      }

      // Re-throw the error with original message if it's already descriptive
      throw error
    }
  }

  // EnableX Event Handlers
  const roomConnected = (event) => {
    console.log("Room connected successfully:", event)
    setIsConnected(true)
    setIsInCall(true)
    setIsJoining(false)
    setError("")
  }

  const roomError = (event) => {
    console.error("Room connection error:", event)
    setError("Failed to connect to the call")
    setIsJoining(false)
    setIsConnected(false)
  }

  const roomDisconnected = (event) => {
    console.log("Room disconnected:", event)
    setIsConnected(false)
    setIsInCall(false)
    setParticipants([])
    cleanupVideoElements()
  }

  const streamAdded = (event) => {
    console.log("Remote stream added:", event)
    const remoteStream = event.stream
    const clientId = event.clientId

    // Store the remote stream
    remoteStreamsRef.current.set(clientId, remoteStream)

    // Play remote stream in video element (for video calls)
    if (callType === "video" && remoteVideoRef.current) {
      try {
        remoteStream.play(remoteVideoRef.current)
      } catch (error) {
        console.error("Error playing remote stream:", error)
      }
    }

    // Update participants
    setParticipants((prev) => {
      const exists = prev.find((p) => p.id === clientId)
      if (exists) return prev
      return [...prev, { id: clientId, name: `Participant ${clientId}` }]
    })
  }

  const streamRemoved = (event) => {
    console.log("Remote stream removed:", event)
    const clientId = event.clientId

    // Clean up remote stream
    remoteStreamsRef.current.delete(clientId)

    // Update participants
    setParticipants((prev) => prev.filter((p) => p.id !== clientId))

    // Clear remote video if this was the last participant
    if (remoteStreamsRef.current.size === 0 && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null
    }
  }

  const activeTalkerReceived = (event) => {
    console.log("Active talker:", event)
  }

  const userConnected = (event) => {
    console.log("User connected:", event)
  }

  const userDisconnected = (event) => {
    console.log("User disconnected:", event)
  }

  // Clean up video elements
  const cleanupVideoElements = () => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null
    }
    remoteStreamsRef.current.clear()
  }

  // Join video call
  const joinCall = async () => {
    // Validate required parameters
    if (!doctorId) {
      setError("Missing receiver information. Please try again.")
      return
    }

    if (!consultationType) {
      setError("Missing consultation type. Please try again.")
      return
    }

    if (!["video", "audio"].includes(callType)) {
      setError("Invalid call type. Please try again.")
      return
    }

    setIsJoining(true)
    setError("")

    try {
      // Get token from your backend with simplified payload
      const token = await getToken(callType)

      // Check if EnableX SDK is available
      if (window.EnxRtc) {
        try {
          // Configure stream options
          const streamOptions = {
            audio: true,
            video: callType === "video",
            data: true,
            audioOnlyMode: callType === "audio",
            attributes: {
              receiverId: doctorId,
              callType: callType,
            },
          }

          // Additional room options
          const roomOptions = {
            playerConfiguration: {
              autoPlay: true,
              controls: false,
              muted: false,
            },
          }

          // Create room instance with proper callbacks
          const room = new window.EnxRtc.EnxRoom()

          // Set up event listeners before joining
          room.addEventListener("room-connected", roomConnected)
          room.addEventListener("room-error", roomError)
          room.addEventListener("room-disconnected", roomDisconnected)
          room.addEventListener("stream-added", streamAdded)
          room.addEventListener("stream-removed", streamRemoved)
          room.addEventListener("active-talker-list", activeTalkerReceived)
          room.addEventListener("user-connected", userConnected)
          room.addEventListener("user-disconnected", userDisconnected)

          // Store room reference
          enxRoomRef.current = room

          // Join room with token and options
          const localStream = await room.joinRoom(token, streamOptions, roomOptions)

          // Store local stream reference
          localStreamRef.current = localStream

          // Handle local stream (only if video call)
          if (callType === "video" && localVideoRef.current && localStream) {
            try {
              localStream.play(localVideoRef.current)
            } catch (error) {
              console.error("Error playing local stream:", error)
            }
          }
        } catch (sdkError) {
          console.error("EnableX SDK error:", sdkError)
          throw new Error("Failed to initialize video call: " + sdkError.message)
        }
      } else {
        // Simulate connection for demo purposes when EnableX is not available
        console.log("EnableX SDK not found, simulating connection...")
        setTimeout(() => {
          setIsConnected(true)
          setIsInCall(true)
          setIsJoining(false)
          // Add a mock participant
          setParticipants([{ id: "receiver-" + doctorId, name: doctor?.name || "Doctor" }])
        }, 2000)
      }
    } catch (error) {
      console.error("Error joining call:", error)
      setIsJoining(false)

      // Provide specific error messages based on the error type
      let errorMessage =
        "Failed to join call. Please try again. (If running locally, ensure your backend is reachable.)"

      if (error.message.includes("Receiver ID is required")) {
        errorMessage = "Missing consultation details. Please try again."
      } else if (error.message.includes("Network error")) {
        errorMessage = "Unable to connect to server. Please check your internet connection."
      } else if (error.message.includes("HTTP 400")) {
        errorMessage = "Invalid request. Please check your consultation details."
      } else if (error.message.includes("HTTP 401")) {
        errorMessage = "Authentication failed. Please log in again."
      } else if (error.message.includes("HTTP 403")) {
        errorMessage = "Access denied. You may not have permission for this consultation."
      } else if (error.message.includes("HTTP 404")) {
        errorMessage = "Consultation service not found. Please try again later."
      } else if (error.message.includes("HTTP 500")) {
        errorMessage = "Server error. Please try again later."
      } else if (error.message.includes("No token received")) {
        errorMessage = "Server configuration error. Please contact support."
      } else if (error.message.includes("Server returned non-JSON response")) {
        errorMessage = "Server communication error. Please try again later."
      } else if (error.message) {
        errorMessage = error.message
      }

      setError(errorMessage)
    }
  }

  // Leave video call
  const leaveCall = () => {
    if (enxRoomRef.current) {
      try {
        // Remove event listeners
        enxRoomRef.current.removeEventListener("room-connected", roomConnected)
        enxRoomRef.current.removeEventListener("room-error", roomError)
        enxRoomRef.current.removeEventListener("room-disconnected", roomDisconnected)
        enxRoomRef.current.removeEventListener("stream-added", streamAdded)
        enxRoomRef.current.removeEventListener("stream-removed", streamRemoved)
        enxRoomRef.current.removeEventListener("active-talker-list", activeTalkerReceived)
        enxRoomRef.current.removeEventListener("user-connected", userConnected)
        enxRoomRef.current.removeEventListener("user-disconnected", userDisconnected)

        // Disconnect from room
        enxRoomRef.current.disconnect()
      } catch (error) {
        console.error("Error disconnecting:", error)
      }
      enxRoomRef.current = null
    }

    // Clean up references
    localStreamRef.current = null

    // Clean up video elements
    cleanupVideoElements()

    setIsInCall(false)
    setIsConnected(false)
    setParticipants([])

    // In a real app, you might want to navigate back here
    console.log("Call ended - would navigate back in real app")
  }

  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current && callType === "video") {
      try {
        if (isVideoEnabled) {
          localStreamRef.current.muteVideo()
        } else {
          localStreamRef.current.unmuteVideo()
        }
        setIsVideoEnabled(!isVideoEnabled)
      } catch (error) {
        console.error("Error toggling video:", error)
        // For demo, just toggle the state
        setIsVideoEnabled(!isVideoEnabled)
      }
    }
  }

  // Toggle audio
  const toggleAudio = () => {
    if (localStreamRef.current) {
      try {
        if (isAudioEnabled) {
          localStreamRef.current.muteAudio()
        } else {
          localStreamRef.current.unmuteAudio()
        }
        setIsAudioEnabled(!isAudioEnabled)
      } catch (error) {
        console.error("Error toggling audio:", error)
        // For demo, just toggle the state
        setIsAudioEnabled(!isAudioEnabled)
      }
    }
  }

  // Go back function
  const goBack = () => {
    if (isInCall) {
      leaveCall()
    }
    // In real app: navigate(-1) or navigate to specific route
    console.log("Would navigate back in real app")
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isInCall) {
        leaveCall()
      }
    }
  }, [])

  // Loading/Joining screen
  if (isJoining) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            {callType === "video" ? <Video className="w-8 h-8 text-white" /> : <Phone className="w-8 h-8 text-white" />}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Joining Call...</h1>
          <p className="text-white/70 mb-4">Connecting to {specialtyName} consultation</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    )
  }

  // Error screen
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <PhoneOff className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Connection Failed</h1>
          <p className="text-white/70 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => retryCall().catch((err) => console.error("Retry failed:", err))}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={goBack}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main call interface
  if (!isInCall) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {callType === "video" ? <Video className="w-8 h-8 text-white" /> : <Phone className="w-8 h-8 text-white" />}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Ready to Connect</h1>
          <p className="text-white/70 mb-2">{specialtyName} consultation</p>
          <p className="text-white/50 text-sm mb-2">
            Type: {callType.charAt(0).toUpperCase() + callType.slice(1)} Call
          </p>
          <p className="text-white/50 text-xs mb-6">Receiver ID: {doctorId}</p>
          <div className="space-y-3">
            <button
              onClick={joinCall}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {callType === "video" ? <Video className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
              Start {callType === "video" ? "Video" : "Audio"} Call
            </button>
            <button
              onClick={goBack}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-400" : "bg-yellow-400 animate-pulse"}`}></div>
          <span className="text-white font-medium">{specialtyName} Consultation</span>
          <span className="text-white/70 text-sm">({callType})</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white/70">
            <Users className="w-4 h-4" />
            <span>{participants.length + 1}</span>
          </div>
          <button onClick={goBack} className="text-white/70 hover:text-white transition-colors" title="Leave call">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Container - Only show for video calls */}
      {callType === "video" ? (
        <div className="flex-1 relative">
          {/* Remote Video */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <video ref={remoteVideoRef} className="w-full h-full object-cover" autoPlay playsInline />
            {participants.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/50 text-center">
                  <Users className="w-12 h-12 mx-auto mb-2" />
                  <p>Waiting for other participant to join...</p>
                </div>
              </div>
            )}
          </div>

          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-white/20">
            <video ref={localVideoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
            {!isVideoEnabled && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <VideoOff className="w-8 h-8 text-white/50" />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Audio Call Interface */
        <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div
              className={`w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl ${isConnected ? "" : "animate-pulse"}`}
            >
              <Phone className="w-16 h-16" />
            </div>
            <h2 className="text-3xl font-semibold mb-2">Audio Call</h2>
            <p className="text-white/70 text-lg mb-2">{specialtyName} Consultation</p>
            <p className="text-white/50">
              {participants.length > 0
                ? `Connected with ${participants.length} participant(s)`
                : "Waiting for other participant to join..."}
            </p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-gray-900 p-6">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full transition-colors ${
              isAudioEnabled ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
          >
            {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>

          {callType === "video" && (
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full transition-colors ${
                isVideoEnabled ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
            >
              {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>
          )}

          <button
            onClick={leaveCall}
            className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
            title="End call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoCallComponent
