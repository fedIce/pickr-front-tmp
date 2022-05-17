import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { ContainedLoader } from '../Loader';

const center = { lat: -3.745, lng: -38.523 };

const containerStyle = {
    width: '100%',
    height: '100%'
};

const GoogleMapUI = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API,
        libraries:['places']
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])


    return (
        <div className='flex w-full bg-red-200 justify-center items-center rounded-lg overflow-hidden h-full'>
            {
                isLoaded ?
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={{
                            streetViewControl:false,
                            mapTypeControl:false,
                            // zoomControl:false,
                            // fullscreenControl: false
                        }}>
                            <Marker position={center} />
                        
                    </GoogleMap>
                    : <ContainedLoader/>
            }
        </div >
    )
}

export const PlaceHolder = () => {
    return (
        <div className='flex w-full bg-red-200 justify-center items-center h-full'>
            <div>Map Place Holder </div>
        </div>
    )
}

export default GoogleMapUI