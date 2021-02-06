import React, { useState, useCallback, useRef } from "react"
import { GoogleMap, LoadScript, Rectangle } from '@react-google-maps/api';


const SearchMap = ({lat, lng}) => {

    const defaultRecHeight = 0.2

    const recRef = React.createRef()

    const onBoundsChanged = () => {
        if (recRef.current) {
            console.log("Top: " + recRef.current.state.rectangle.bounds.Va.j)
            console.log("Left: " + recRef.current.state.rectangle.bounds.Qa.i)
            console.log("right: " + recRef.current.state.rectangle.bounds.Qa.j)
            console.log("Bottom: " + recRef.current.state.rectangle.bounds.Va.i)
        }
    }
    const onLoad = rectangle => {
        console.log('rectangle: ', rectangle)
    }
    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <LoadScript
                googleMapsApiKey="AIzaSyDUMIM9NY03q-X5E1BmdACK2u9SPsukZpI"
                libraries={["drawing"]}
            >
                <GoogleMap
                    mapContainerStyle={{
                        width: '100%',
                        height: '100%'
                    }}
                    center={{
                        lat: lat,
                        lng: lng
                    }}
                    zoom={10}
                >
                    <Rectangle
                        ref={recRef}
                        onLoad={onLoad}
                        bounds={{
                            north: lat + defaultRecHeight,
                            south: lat - defaultRecHeight,
                            east: lng + defaultRecHeight,
                            west: lng - defaultRecHeight
                        }}
                        editable={true}
                        onBoundsChanged={onBoundsChanged}
                    />
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

export default SearchMap
