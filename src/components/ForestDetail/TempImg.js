// import React, { useState, useRef, useEffect } from "react"
// import { Button } from 'antd';

// const TempImg = ({ top, bot, left, right, onSubmit, onReturn }) => {

//     const createRegionFormData = () => {
//         var x = []
//         for (var i = 1; i < 4; i++) {
//             x.push({ 'attr1': 0, 'attr2': 0, 'attr3': 0, 'attr4': 0, "description": "" })
//         }
//         return (x)
//     }

//     const buttonStyle = {
//         float: "right",
//         marginLeft: "30px"
//     }

//     const { REACT_APP_GOOGLE_KEY } = process.env

//     const imgDimension = 640
//     const latDiff = top - bot
//     const lngDiff = right - left

//     var geoViewport = require('@mapbox/geo-viewport')

//     var bounds = geoViewport.viewport([
//         bot,
//         left,
//         right,
//         top
//     ], [480, 480]);

//     // const getZoomLevel = (latDiff, lngDiff) => {
//     //     var zoomLevel = 1;
//     //     var maxDiff = (lngDiff > latDiff) ? lngDiff : latDiff;
//     //     if (maxDiff < 360 / Math.pow(2, 20)) {
//     //         zoomLevel = 21;
//     //     } else {
//     //         zoomLevel = Math.floor(-1*( (Math.log(maxDiff)/Math.log(2)) - (Math.log(360)/Math.log(2))));
//     //         if (zoomLevel < 1)
//     //             zoomLevel = 1;
//     //     }
//     //     return zoomLevel
//     // }
//     var lat = (top + bot) / 2
//     var lng = (left + right) / 2

//     var img_height = Math.round(latDiff > lngDiff ? imgDimension : (latDiff / lngDiff) * imgDimension)

//     var img_width = Math.round(lngDiff > latDiff ? imgDimension : (lngDiff / latDiff) * imgDimension)

//     console.log("&size=" + img_width + "x" + img_height + "&maptype=satellite&key=")


//     // var height = 640
//     // var width = 640

//     return (
//         <div style={{ position: "relative", marginBottom: "20px" }}
//             onDragStart={(e) => { e.preventDefault(); }} >
//             <img
//                 style={{ "width": "100%", zIndex: "1" }}
//                 draggable="false"
//                 ref={imgRef}
//                 onDragStart={(e) => { e.preventDefault(); }}
//                 src={"https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=" + bounds.zoom + "&size=" + img_width + "x" + img_height +
//                     "&maptype=satellite&key=" + `${REACT_APP_GOOGLE_KEY}`}
//             />
//             <Button onClick={() => { console.log("erase") }}>erase</Button>
//             <Button onClick={() => { console.log("1") }}>1</Button>
//             <Button onClick={() => { console.log("2") }}>2</Button>
//             <Button onClick={() => { console.log("3") }}>3</Button>
//             <Button onClick={onSubmit}>submit</Button>
//             <Button style={buttonStyle} key="back" onClick={onReturn}>
//                 Return
//           </Button>
//         </div>
//     )
// }
// const mapStateToProps = (state) => {
//     console.log(state);
//     return {
//         token: state.token
//     }
// }
// export default connect(mapStateToProps)(TempImg)
