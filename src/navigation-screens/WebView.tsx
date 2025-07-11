import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { AlertUtil } from '../utility/alert';


const WebViewScreen = () => {
    const webviewRef = useRef<WebView>(null);
  
    const sendMessageToWeb = () => {
      webviewRef.current?.postMessage('Hello from React Native!');
    };
  
    const onMessage = (event: any) => {
        AlertUtil.info('Received from WebView: ' + event.nativeEvent.data);
    };
  
    return (
      <View style={{ flex: 1 }}>
        <Button title="Send Message to WebView" onPress={sendMessageToWeb} />
        <WebView
          ref={webviewRef}
          source={{ uri: 'https://ventla.io' }} // or use { html: '<html>...</html>' }
          onMessage={onMessage}
          injectedJavaScript={`
            document.addEventListener('message', function(event) {
              alert('Received from RN: ' + event.data);
            });
            true; 
          `}
        />
      </View>
    );
  };
  
  export default WebViewScreen;