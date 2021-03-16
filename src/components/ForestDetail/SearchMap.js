import React, { useState, useCallback, useRef } from "react"
import { GoogleMap, useJsApiLoader, Rectangle } from '@react-google-maps/api';
import { Button } from 'antd';


const SearchMap = ({ lat, lng, onReturn, onSubmit }) => {

    const buttonStyle = {
        float: "right",
        marginLeft: "30px",
        marginTop: "25px"
    }

    const defaultRecHeight = 0.2

    const { REACT_APP_GOOGLE_KEY } = process.env

    // const [top, setTop] = useState(lat + defaultRecHeight)
    // const [left, setLeft] = useState(lng - defaultRecHeight)
    // const [right, setRight] = useState(lng + defaultRecHeight)
    // const [bottom, setBottom] = useState(lat - defaultRecHeight)

    var top = lat + defaultRecHeight
    var left = lng - defaultRecHeight
    var right = lng + defaultRecHeight
    var bottom = lat - defaultRecHeight

    const setBounds = (s) => {
        console.log(s)
        s = s.slice(2, -2)
        s = s.split("), (")
        s.map((item, i) => {
            s[i] = item.split(", ").map(s => +s)
        })
        bottom = s[0][0]
        left = s[0][1]
        top = s[1][0]
        right = s[1][1]
    }

    const recRef = React.createRef()

    const onBoundsChanged = () => {
        if (recRef.current) {
            setBounds(String(recRef.current.state.rectangle.getBounds()))
            // console.log("Top: " + top)
            // console.log("Left: " + left)
            // console.log("right: " + right)
            // console.log("Bottom: " + bottom)
        }
    }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${REACT_APP_GOOGLE_KEY}`
    })

    const onLoad = rectangle => {
        // console.log('rectangle: ', rectangle)
    }
    return isLoaded ? (
        <div style={{ height: '80vh', width: '100%' }}>
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
            <Button style={buttonStyle} key="submit" onClick={() => onSubmit(top, left, right, bottom)} type="primary">
                Submit
          </Button>
            <Button style={buttonStyle} key="back" onClick={onReturn}>
                Back
          </Button>
        </div>
    ) : <></>

}

export default SearchMap
