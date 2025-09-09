import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const SDKVerification = () => {
  const [sdkStatus, setSdkStatus] = useState('checking');
  const [sdkVersion, setSdkVersion] = useState(null);
  const [sdkMethods, setSdkMethods] = useState([]);

  useEffect(() => {
    const checkSDK = () => {
      if (typeof window.EnxRtc === 'undefined') {
        setSdkStatus('not-loaded');
        return;
      }

      setSdkStatus('loaded');
      
      // Try to get SDK version if available
      if (window.EnxRtc.version) {
        setSdkVersion(window.EnxRtc.version);
      }

      // Check available methods
      const methods = [];
      if (typeof window.EnxRtc.joinRoom === 'function') methods.push('joinRoom');
      if (typeof window.EnxRtc.getUserMedia === 'function') methods.push('getUserMedia');
      if (typeof window.EnxRtc.createRoom === 'function') methods.push('createRoom');
      
      setSdkMethods(methods);
    };

    // Check immediately
    checkSDK();

    // Also check after a short delay in case SDK is still loading
    const timer = setTimeout(checkSDK, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = () => {
    switch (sdkStatus) {
      case 'loaded':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'not-loaded':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getStatusText = () => {
    switch (sdkStatus) {
      case 'loaded':
        return 'EnableX SDK loaded successfully!';
      case 'not-loaded':
        return 'EnableX SDK not found!';
      default:
        return 'Checking EnableX SDK...';
    }
  };

  const getStatusColor = () => {
    switch (sdkStatus) {
      case 'loaded':
        return 'bg-green-50 border-green-200';
      case 'not-loaded':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">EnableX SDK Status</h2>
      
      <div className={`p-4 rounded-lg border-2 ${getStatusColor()} mb-6`}>
        <div className="flex items-center gap-3 mb-4">
          {getStatusIcon()}
          <span className="text-lg font-semibold">{getStatusText()}</span>
        </div>
        
        {sdkStatus === 'loaded' && (
          <div className="space-y-3">
            {sdkVersion && (
              <div>
                <strong>Version:</strong> {sdkVersion}
              </div>
            )}
            
            <div>
              <strong>Available Methods:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                {sdkMethods.length > 0 ? (
                  sdkMethods.map(method => (
                    <li key={method} className="text-green-700">{method}</li>
                  ))
                ) : (
                  <li className="text-gray-500">Checking methods...</li>
                )}
              </ul>
            </div>
            
            <div>
              <strong>Global Object:</strong> window.EnxRtc ✓
            </div>
          </div>
        )}
        
        {sdkStatus === 'not-loaded' && (
          <div className="space-y-2 text-red-700">
            <p><strong>Troubleshooting Steps:</strong></p>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Verify EnxRtc.js is in the public/ folder</li>
              <li>Check the script tag in public/index.html</li>
              <li>Ensure the script loads before React</li>
              <li>Check browser console for 404 errors</li>
              <li>Try hard refresh (Ctrl+F5 or Cmd+Shift+R)</li>
            </ol>
          </div>
        )}
      </div>

      {/* Debug Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Information:</h3>
        <div className="text-sm space-y-1 font-mono">
          <div>Current URL: {window.location.href}</div>
          <div>Public URL: {'/'}</div>
          <div>SDK Path: {'/EnxRtc.js'}</div>
          <div>Window.EnxRtc: {typeof window.EnxRtc}</div>
        </div>
      </div>

      {/* Manual Check Button */}
      <div className="mt-6">
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Refresh Page
        </button>
        
        <button
          onClick={() => {
            console.log('EnableX SDK Check:', {
              available: typeof window.EnxRtc !== 'undefined',
              type: typeof window.EnxRtc,
              methods: window.EnxRtc ? Object.keys(window.EnxRtc) : []
            });
            alert('Check browser console for detailed SDK information');
          }}
          className="ml-3 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Console Debug
        </button>
      </div>
    </div>
  );
};

export default SDKVerification;