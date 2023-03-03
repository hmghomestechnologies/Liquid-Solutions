import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../../../constants/ApiKeys";
import { useCarContext } from "../../../context/CarContext";

export default function CarMapContainer() {
  const { pickupLocation } = useCarContext();
  console.log(pickupLocation);
  const mapRef = useRef();
  //   useEffect(() => {
  //     if (!pickupLocation || !destination) return;

  //     mapRef.current.fitToSuppliedMarkers(["pickupLocation", "destination"], {
  //       edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
  //     });
  //   }, [pickupLocation, destination]);

  useEffect(() => {}, []);
  return (
    <MapView
      //   ref={mapRef}
      style={{ flex: 1 }}
      mapType="mutedStandard"
      initialRegion={{
        latitude: pickupLocation?.location?.lat
          ? pickupLocation?.location?.lat
          : 9.081999,
        longitude: pickupLocation?.location?.lng
          ? pickupLocation?.location?.lng
          : 8.675277,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {/* {pickupLocation?.description && destination?.description && (
        <MapViewDirections
          pickupLocation={pickupLocation?.description}
          destination={destination?.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor={"red"}
        />
      )} */}
      {pickupLocation?.description && (
        <Marker
          coordinate={{
            latitude: pickupLocation?.location?.lat,
            longitude: pickupLocation?.location?.lng,
          }}
          title="Pick up Location"
          description={pickupLocation?.description}
          identifier="origin"
        />
      )}
      {/* {destination?.location?.lat && (
        <Marker
          coordinate={{
            latitude: destination?.location?.lat,
            longitude: destination?.location?.lng,
          }}
          title="Destination"
          description={destination?.description}
          identifier="destination"
        />
      )} */}
    </MapView>
  );
}
