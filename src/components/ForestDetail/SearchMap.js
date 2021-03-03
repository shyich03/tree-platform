import React, { useState, useCallback, useRef } from "react"
import { GoogleMap, LoadScript, Rectangle } from '@react-google-maps/api';
import { Button } from 'antd';


const SearchMap = ({ lat, lng, onReturn, onSubmit }) => {

    const buttonStyle = {
        float:"right",
        marginLeft:"30px",
        marginTop:"25px"
    }

    const defaultRecHeight = 0.2

    const {REACT_APP_GOOGLE_KEY} = process.env

    // const [top, setTop] = useState(lat + defaultRecHeight)
    // const [left, setLeft] = useState(lng - defaultRecHeight)
    // const [right, setRight] = useState(lng + defaultRecHeight)
    // const [bottom, setBottom] = useState(lat - defaultRecHeight)

    var top = lat + defaultRecHeight
    var left = lng - defaultRecHeight
    var right = lng + defaultRecHeight
    var bottom = lat - defaultRecHeight

    const recRef = React.createRef()

    const onBoundsChanged = () => {
        if (recRef.current) {
            // console.log("Top: " + recRef.current.state.rectangle.bounds.Va.j)
            // console.log("Left: " + recRef.current.state.rectangle.bounds.Qa.i)
            // console.log("right: " + recRef.current.state.rectangle.bounds.Qa.j)
            // console.log("Bottom: " + recRef.current.state.rectangle.bounds.Va.i)
            top = recRef.current.state.rectangle.bounds.Va.j
            left = recRef.current.state.rectangle.bounds.Qa.i
            right = recRef.current.state.rectangle.bounds.Qa.j
            bottom = recRef.current.state.rectangle.bounds.Va.i
        }
    }

    const onLoad = rectangle => {
        // console.log('rectangle: ', rectangle)
    }
    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <LoadScript
                googleMapsApiKey={`${REACT_APP_GOOGLE_KEY}`}
            >
                <GoogleMap
                    mapContainerStyle={{
                        width: '100%',
                        height: '90%'
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
                            north: top,
                            south: bottom,
                            east: right,
                            west: left
                        }}
                        editable={true}
                        onBoundsChanged={onBoundsChanged}
                    />
                </GoogleMap>
            </LoadScript>
            <Button style={buttonStyle} key="submit" onClick={() => onSubmit(top, left, right, bottom)} type="primary">
                Submit
          </Button>
          <Button style={buttonStyle} key="back" onClick={onReturn}>
                Back
          </Button>
        </div>
    )
}

export default SearchMap
