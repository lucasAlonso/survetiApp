import { Link as SolitoLink } from 'solito/link'
import React, { useRef, useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import {
  Center,
  Image,
  HStack,
  Text,
  Heading,
  Code,
  Link,
  VStack,
  Button,
  AspectRatio,
  Box,
} from 'native-base'
import { ColorModeSwitch } from '../../components'

export function HomeScreen() {
  const [currentPosition, setCurrentPosition] =
    useState<Location.LocationObject>()

  const mapRef = useRef<MapView>(null)

  const [locationPermission] = Location.useForegroundPermissions({
    request: true,
  })

  useEffect(() => {
    if (locationPermission?.granted) {
      Location.getCurrentPositionAsync().then(setCurrentPosition)
    }
  }, [locationPermission])

  useEffect(() => {
    if (currentPosition) {
      mapRef.current?.animateCamera({
        center: currentPosition.coords,
        zoom: 16,
      })
    }
  }, [currentPosition])
  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  return (
    <Center
      flex={1}
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
    >
      <MapView
        ref={mapRef}
        provider="google"
        onPress={(e) => console.log(e.nativeEvent)}
        style={{ flex: 1 }}
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      ></MapView>
    </Center>
  )
}
