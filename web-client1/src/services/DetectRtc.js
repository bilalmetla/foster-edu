import React from "React";


export default load function (){

    const DetectRTC = window.DetectRTC
    
    DetectRTC.load(function() {
        DetectRTC.hasWebcam; // (has webcam device!)
        DetectRTC.hasMicrophone; // (has microphone device!)
        DetectRTC.hasSpeakers; // (has speakers!)
        DetectRTC.isScreenCapturingSupported; // Chrome, Firefox, Opera, Edge and Android
        DetectRTC.isSctpDataChannelsSupported;
        DetectRTC.isRtpDataChannelsSupported;
        DetectRTC.isAudioContextSupported;
        DetectRTC.isWebRTCSupported;
        DetectRTC.isDesktopCapturingSupported;
        DetectRTC.isMobileDevice;
    
        DetectRTC.isWebSocketsSupported;
        DetectRTC.isWebSocketsBlocked;
        DetectRTC.checkWebSocketsSupport(callback);
    
        DetectRTC.isWebsiteHasWebcamPermissions;        // getUserMedia allowed for HTTPs domain in Chrome?
        DetectRTC.isWebsiteHasMicrophonePermissions;    // getUserMedia allowed for HTTPs domain in Chrome?
    
        DetectRTC.audioInputDevices;    // microphones
        DetectRTC.audioOutputDevices;   // speakers
        DetectRTC.videoInputDevices;    // cameras
    
        DetectRTC.osName;
        DetectRTC.osVersion;
    
        DetectRTC.browser.name === 'Edge' || 'Chrome' || 'Firefox';
        DetectRTC.browser.version;
        DetectRTC.browser.isChrome;
        DetectRTC.browser.isFirefox;
        DetectRTC.browser.isOpera;
        DetectRTC.browser.isIE;
        DetectRTC.browser.isSafari;
        DetectRTC.browser.isEdge;
    
        DetectRTC.browser.isPrivateBrowsing; // incognito or private modes
    
        DetectRTC.isCanvasSupportsStreamCapturing;
        DetectRTC.isVideoSupportsStreamCapturing;
    
        DetectRTC.DetectLocalIPAddress(callback);
    });
}
