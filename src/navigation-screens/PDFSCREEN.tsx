import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import Pdf from 'react-native-view-pdf';

const PDFSCREEN = () => {
  const resources = {
    url: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
  };
  const resourceType = 'url';

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        resource={resources.url}
        resourceType={resourceType}
        onLoad={() => console.log('PDF loaded')}
        onError={error => console.log('Cannot render PDF', error)}
        style={{ flex: 1, width: Dimensions.get('window').width }}
      />
    </View>
  );
};

export default PDFSCREEN;