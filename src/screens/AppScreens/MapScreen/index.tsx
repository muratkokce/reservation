import React, {useRef} from 'react';
import {AppBottomTabParams} from '@/navigation/AppStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import Globals from '@/constants/Globals';
import MapView, {Marker} from 'react-native-maps';

type Props = NativeStackScreenProps<AppBottomTabParams, 'MapScreen'>;

const MapScreen: React.FC<Props> = () => {
  const mapRef = useRef<MapView>(null);

  return (
    <MapView
      ref={mapRef}
      style={styles.container}
      initialRegion={{
        latitude: Globals.IstanbulCoordinates.latitude,
        latitudeDelta: 0.004,
        longitude: Globals.IstanbulCoordinates.longitude,
        longitudeDelta: 0.009,
      }}>
      {Globals.MockMarkers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
  );
};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
