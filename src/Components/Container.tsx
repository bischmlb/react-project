import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Container.css';
import f1 from '../geoJSONfile/prd-aerodrome2_outer.json';
import f2 from '../geoJSONfile/prd-aerodrome5_outer.json';
import f3 from '../geoJSONfile/prd-airportCommercial2_outer.json';
import f4 from '../geoJSONfile/prd-airportCommercial5_outer.json';
import f5 from '../geoJSONfile/prd-airportMilitary2_outer.json';
import f6 from '../geoJSONfile/prd-airportMilitary8_outer.json';
import f7 from '../geoJSONfile/prd-buffer.json';
import f8 from '../geoJSONfile/prd-castle_inner.json';
import f9 from '../geoJSONfile/prd-castle_outer.json';
import f10 from '../geoJSONfile/prd-column3_inner.json';
import f11 from '../geoJSONfile/prd-column3_outer.json';
import f12 from '../geoJSONfile/prd-embassy_inner.json';
import f13 from '../geoJSONfile/prd-embassy_outer.json';
import f14 from '../geoJSONfile/prd-gliderAerodrome3_outer.json';
import f15 from '../geoJSONfile/prd-helipad1_outer.json';
import f16 from '../geoJSONfile/prd-hems1_outer.json';
import f17 from '../geoJSONfile/prd-hems2_outer.json';
import f18 from '../geoJSONfile/prd-military_inner.json';
import f19 from '../geoJSONfile/prd-military_outer.json';
import f20 from '../geoJSONfile/prd-nature_outer.json';
import f21 from '../geoJSONfile/prd-parachute3_outer.json';
import f22 from '../geoJSONfile/prd-police_inner.json';
import f23 from '../geoJSONfile/prd-police_outer.json';
import f24 from '../geoJSONfile/prd-prison_inner.json';
import f25 from '../geoJSONfile/prd-prison_outer.json';
import f26 from '../geoJSONfile/prd-privateRunway3_outer.json';
import f27 from '../geoJSONfile/prd-waterAerodrome3_outer.json';
const axios = require('axios').default;



const files = [
    f1,
    f2,
    f3,
    f4,
    f5,
    f6,
    f7,
    f8,
    f9,
    f10,
    f11,
    f12,
    f13,
    f14,
    f15,
    f16,
    f17,
    f18,
    f19,
    f20,
    f21,
    f22,
    f23,
    f24,
    f25,
    f26,
    f27
]

const fileNames = [
    '../geoJSONfile/prd-aerodrome2_outer.json',
    '../geoJSONfile/prd-aerodrome5_outer.json',
    '../geoJSONfile/prd-airportCommercial2_outer.json',
    '../geoJSONfile/prd-airportCommercial5_outer.json',
    '../geoJSONfile/prd-airportMilitary2_outer.json',
    '../geoJSONfile/prd-airportMilitary8_outer.json',
    '../geoJSONfile/prd-buffer.json',
    '../geoJSONfile/prd-castle_inner.json',
    '../geoJSONfile/prd-castle_outer.json',
    '../geoJSONfile/prd-column3_inner.json',
    '../geoJSONfile/prd-column3_outer.json',
    '../geoJSONfile/prd-embassy_inner.json',
    '../geoJSONfile/prd-embassy_outer.json',
    '../geoJSONfile/prd-gliderAerodrome3_outer.json',
    '../geoJSONfile/prd-helipad1_outer.json',
    '../geoJSONfile/prd-hems1_outer.json',
    '../geoJSONfile/prd-hems2_outer.json',
    '../geoJSONfile/prd-military_inner.json',
    '../geoJSONfile/prd-military_outer.json',
    '../geoJSONfile/prd-nature_outer.json',
    '../geoJSONfile/prd-parachute3_outer.json',
    '../geoJSONfile/prd-police_inner.json',
    '../geoJSONfile/prd-police_outer.json',
    '../geoJSONfile/prd-prison_inner.json',
    '../geoJSONfile/prd-prison_outer.json',
    '../geoJSONfile/prd-privateRunway3_outer.json',
    '../geoJSONfile/prd-waterAerodrome3_outer.json',
]

const array:any[] = [];

function processFiles(arr: any[]){
    arr.forEach((data: any) => {
        array.push({
            type: 'geojson',
            data
            }
        );
    })
}

var markerArray: any = []


processFiles(files);






mapboxgl.accessToken = 'pk.eyJ1IjoibmF2aWFpci11dG0iLCJhIjoiY2tpdWtxdzJqMGNiMzJ0bnpmYzZicmJsMiJ9.QaY60enzHFot0poi7E2FCw';



export const Container: React.FC = (props) => {
    var userCoords:number[] = [];
    navigator.geolocation.getCurrentPosition(function(position) {
    userCoords.push(position.coords.latitude);
    userCoords.push(position.coords.longitude);
     });


    const [getLatLng, setLatLng] = useState<{ lat: number, long: number }>({ lat: 55.39594, long: 10.38831 });
    const [getMap, setMap] = useState<mapboxgl.Map>();
    const mapContainer = useRef<HTMLDivElement>(null);
    const [getZoom, setZoom] = useState<number>(15.5);
    const [getMarker, setMarker] = useState<mapboxgl.Marker>();
    const [getUserLatLong, setUserLatLong] = useState<{latUser: number, longUser: number}>({latUser: userCoords[0], longUser: userCoords[1]});


    useEffect(() => {
        const {lat, long} = getLatLng;

        if (mapContainer.current) {
            setMap(new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [long, lat],
                zoom: getZoom,
            }))
        }

        window.addEventListener('scroll', (event) => {
            const zoom = getZoom;
            
          });
    }, [])


    useEffect(()=>{
        getMap?.once('load', ()=>{
            var layers:any;
            layers = getMap.getStyle().layers;
            var labelLayerID:any;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerID = layers[i].id;
                break;
                }
            }
            
            array.forEach((element: any, index) => {
                getMap.addSource(fileNames[index], element);
                getMap.addLayer({
                    'id': fileNames[index],
                    'type':'fill',
                    'source': fileNames[index],
                    'layout': {},
                    'paint': {
                        'fill-color': '#00ff00',
                        'fill-opacity': 0.8,
                    },
                    'maxzoom': 15
                });
                getMap.addLayer({
                    'id': '3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'layout': { },
                    'paint': {
                        'fill-extrusion-color': '#00FF00',
                        'fill-extrusion-opacity': 0.8,
                        'fill-extrusion-height': [ 
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min-height']
                        ],
                     }
                },
                labelLayerID
                );
            })

            window.setInterval(() => {
                axios.get('http://localhost:7071/api/HttpTrigger1?getLatLong')
                            .then(function(response:any){
                                console.log("Fetching latest data => (success)");
                                const { data } = response;
                                data.LatLong.forEach((el:any, index:any) => {
                                    // DOM style element :)
                                    var domel = document.createElement('div');
                                    domel.className = 'marker';
                                    setMarker(new mapboxgl.Marker({
                                        'element': domel,
                                        'rotation': data.DeviceRotation[index]
                                    })
                                    .setLngLat([el[1], el[0]])
                                    .addTo(getMap)
                                    )
                                });
                            })
                            .catch(function(error:any){
                                console.log(error);
                                console.log("Fetching latest data => (error)");
                            })

                        }, 4000);

            setMarker(new mapboxgl.Marker({
                'color': '#555',
            })
            .setLngLat([userCoords[1], userCoords[0]])
            .addTo(getMap)
            )

            getMap.flyTo(
                {
                 'center': [userCoords[1], userCoords[0]]   
                }
            )
        })
        
    },[getMap])


    

    return (
        <div>
            <h1>
                <div className='sidebarStyle'> 
                    Restriktionszoner Danmark <br />
                    </div>
                <div ref={mapContainer} className="mapContainer"> </div>
            </h1>
        </div>
    )
}

export default Container;