import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import CutPolygonMode from 'mapbox-gl-draw-cut-polygon-mode';
import mapboxGlDrawPassingMode from 'mapbox-gl-draw-passing-mode';


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

const array: any[] = [];
var allTimeObjects: any[] = [];


const foreCast = (list: any) => {

    var day1: string[] = []
    var day2: string[] = []
    var day3: string[] = []
    var day4: string[] = []
    var day5: string[] = []
    var uniqueDays: string[] = [];
    var allDays = [day1, day2, day3, day4, day5];
    var currObj = list[0].dt_txt;
    var index = 0;

    list.forEach((element: any) => {

        if (element.dt_txt.split(" ")[0] == currObj.split(" ")[0]) {
            try {
                allDays[index].push(element);
                uniqueDays[index] = element.dt_txt.split(" ")[0];
            } catch {
                console.log("foreCast => End of Array");
            }
        } else {
            currObj = element.dt_txt;
            index += 1;
        }
    })
    allTimeObjects = allDays;
    return uniqueDays;
}

const month = new Array();
month[0] = "Januar";
month[1] = "Februar";
month[2] = "Marts";
month[3] = "April";
month[4] = "Maj";
month[5] = "Juni";
month[6] = "Juli";
month[7] = "August";
month[8] = "September";
month[9] = "Oktober";
month[10] = "November";
month[11] = "December";

function processFiles(arr: any[]) {
    arr.forEach((data: any) => {
        array.push({
            type: 'geojson',
            data
        }
        );
    })
}

const openweathermapApiKey = '8a5cef3c50ea0a117d92fef78c859ce0';

var markerArray: any = []


processFiles(files);






mapboxgl.accessToken = 'pk.eyJ1IjoibmF2aWFpci11dG0iLCJhIjoiY2tpdWtxdzJqMGNiMzJ0bnpmYzZicmJsMiJ9.QaY60enzHFot0poi7E2FCw';



export const Container: React.FC = (props) => {
    var userCoords: number[] = [];
    navigator.geolocation.getCurrentPosition(function (position) {
        userCoords.push(position.coords.latitude);
        userCoords.push(position.coords.longitude);
    });


    const [getLatLng, setLatLng] = useState<{ lat: number, long: number }>({ lat: 55.39594, long: 10.38831 });
    const [getMap, setMap] = useState<mapboxgl.Map>();
    const mapContainer = useRef<HTMLDivElement>(null);
    const [getZoom, setZoom] = useState<number>(15.5);
    const [getMarker, setMarker] = useState<mapboxgl.Marker>();
    const [getUserLatLong, setUserLatLong] = useState<{ latUser: number, longUser: number }>({ latUser: userCoords[0], longUser: userCoords[1] });

    useEffect(() => {
        const { lat, long } = getLatLng;

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


    useEffect(() => {

        var Draw = new MapboxDraw({
            userProperties: true,
            displayControlsDefault: true,
            modes: Object.assign(MapboxDraw.modes, {
                cutPolygonMode: CutPolygonMode,
                passing_mode_polygon: mapboxGlDrawPassingMode(
                    MapboxDraw.modes.draw_polygon
                ),
            }),
            controls: {
                polygon: true,
                point: true,
                line_string: true,
                combine_features: false,
                trash: true,
            },
        });

        getMap?.addControl(Draw, 'top-right')

        const updateArea = (e: any) => {
            var data = Draw.getAll();
            if (data.features.length > 0) {
                // restrict to area to 2 decimal points
        }
    };


        getMap?.on('draw.create', (e) => {
            console.log(e.features);
            updateArea(e);
        });
        getMap?.on('draw.delete', (e) => {
            console.log(e.features);
            updateArea(e)
        });
        getMap?.on('draw.update', (e) => {
            console.log(e.features);
            updateArea(e);
        });

        getMap?.once('load', () => {
            var layers: any;
            layers = getMap.getStyle().layers;
            var labelLayerID: any;
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
                    'type': 'fill',
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
                    'layout': {},
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
                }
                    ,
                    labelLayerID
                );

            })

            // Click event
            getMap.on('click', function (e) {
                axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + e.lngLat.lat.toString() + '&lon=' + e.lngLat.lng.toString() + '&appid=' + openweathermapApiKey,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                        },
                        crossdomain: true,
                        //withCredentials: true,

                    })
                    .then((response: any) => {
                        const { data } = response;
                        var d = new Date()
                        var n = d.getMonth();
                        var uniqueDays = foreCast(data.list);
                        new mapboxgl.Popup({anchor: 'top-left', closeOnMove: true, closeOnClick: true, offset: [-50, 50]})
                            .setLngLat(e.lngLat)
                            .setHTML(`<div style="">
                        <div style="color: #333; font-weight: bold; width: 100%">
                        <div style="background-color: rgba(255,255,255,0.8); border-top-left-radius: 2px; border-top-right-radius: 2px; box-shadow: 0px 0px 0px 0px; border: 1px solid #666; border-bottom: 2px solid #444; border-left: 2px solid #444; border-top: 2px solid #444; border-right: 2px solid #444;">
                        <h2 style="text-transform: uppercase; border-bottom: 5px solid #444; padding-bottom: 15px; padding-left: 20px; padding-right: 20px;"> ${data.city.name} </h2>
                        <h3 style=" padding-bottom: 0px;">&#128343; Nu</h3>
                        <div style="display: flex">
                        <div style=" margin-bottom: 15px; color: #333; font-size: 14px; font-weight: bold; width: 100%">
                        ${(Math.round(parseInt(data.list[0].main.temp) - 273.15))} &deg; | &#x1F326; ${data.list[0].weather[0].main} | &#9780 ${data.list[0].wind.speed} m/s
                        </div>
                        </div>
                        </div>
                        </div>
                        <div style="background-color: rgba(255,255,255,0.6); border-color: #444; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; box-shadow: 0px 0px 0px 0px; border-left: 2px solid #444; border-right: 2px solid #444; border-bottom: 2px solid #444; margin-top: -7%;" class="row">
                        <div style="display: flex; padding-top: 50px;" class="row">
                        <div style="width: 100%">
                        <p style="margin-top: 0%; font-weight: bold;">
                        ${parseInt(uniqueDays[1].split("-")[2]) + ". "
                                + month[parseInt(uniqueDays[1].split("-")[1]) - 1]
                                }
                        </p>
                        <p style="margin-top: -2%; font-weight: bold;">
                        ${(Math.round(parseInt(allTimeObjects[1][3].main.temp) - 273.15))} &deg; <br> 
                        ${allTimeObjects[1][3].weather[0].main} &#x1F326;  <br>
                        ${allTimeObjects[1][3].wind.speed} m/s &#9780  <br>
                        </p>
                        </div>
                        <div style="width: 100%">
                        <p style="margin-top: 0%; font-weight: bold;">
                        ${parseInt(uniqueDays[2].split("-")[2]) + ". "
                                + month[parseInt(uniqueDays[2].split("-")[1]) - 1]
                                }
                        </p>
                        <p style="margin-top: -2%; font-weight: bold;">
                        ${(Math.round(parseInt(allTimeObjects[2][3].main.temp) - 273.15))} &deg; <br> 
                        ${allTimeObjects[2][3].weather[0].main} &#x1F326;  <br>
                        ${allTimeObjects[2][3].wind.speed} m/s &#9780  <br>
                        </p>
                        </div>
                        <div style="width: 100%">
                        <p style="margin-top: 0%; font-weight: bold;">
                        ${parseInt(uniqueDays[3].split("-")[2]) + ". "
                                + month[parseInt(uniqueDays[3].split("-")[1]) - 1]
                                }
                        </p>
                        <p style="margin-top: -2%; font-weight: bold;">
                        ${(Math.round(parseInt(allTimeObjects[1][3].main.temp) - 273.15))} &deg; <br> 
                        ${allTimeObjects[3][3].weather[0].main} &#x1F326;  <br>
                        ${allTimeObjects[3][3].wind.speed} m/s &#9780  <br>
                        </p>
                        </div>
                        <div style="width: 100%">
                        <p style="margin-top: 0%; font-weight: bold;">
                        ${parseInt(uniqueDays[4].split("-")[2]) + ". "
                                + month[parseInt(uniqueDays[4].split("-")[1]) - 1]
                                }
                        </p>
                        <p style="margin-top: -2%; font-weight: bold;">
                        ${(Math.round(parseInt(allTimeObjects[1][3].main.temp) - 273.15))} &deg; <br> 
                        ${allTimeObjects[4][3].weather[0].main} &#x1F326;  <br>
                        ${allTimeObjects[4][3].wind.speed} m/s &#9780  <br>
                        </p>
                        </div>
                        </div>

                        </div>`)
                            .addTo(getMap);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    })
            });

            window.setInterval(() => {
                axios.get('http://localhost:7071/api/HttpTrigger1?getLatLong')
                    .then(function (response: any) {
                        //console.log("Fetching latest data => ...");
                        const { data } = response;
                        // DOM style element :)
                        var domel = document.createElement('div');
                        domel.className = 'marker';

                        // Hvis source findes, fjerner vi det så vi kan adde en ny, ellers er det første source + layer og vi adder
                        if (getMap.getSource('airborne-devicesSource')) {
                            getMap.removeLayer('airborne-devicesLayer');
                            getMap.removeSource('airborne-devicesSource');
                        }

                        try {
                        getMap.loadImage(
                            'https://cdn0.iconfinder.com/data/icons/business-660/512/415_airplane_plan_travel_aircaraft-64.png',
                            function (error: any, image: any) {
                                if (error) throw error;
                                getMap.addImage('plane', image);
                                getMap.addSource('airborne-devicesSource', {
                                    type: 'geojson',
                                    data
                                });
                                getMap.addLayer({
                                    'id': 'airborne-devicesLayer',
                                    'type': 'symbol',
                                    'source': 'airborne-devicesSource',
                                    'layout': {
                                        'icon-image': 'plane',
                                        'icon-size': 0.5,
                                        'icon-rotate': 90,
                                        // get the title name from the source's "title" property
                                        'text-field': ['get', 'title'],
                                        'text-font': [
                                            'Open Sans Semibold',
                                            'Arial Unicode MS Bold'
                                        ],
                                        'text-offset': [0, 1.25],
                                        'text-anchor': 'top'
                                    }
                                });
                            }
                        );
                        }
                        catch{
                            console.log("loadImage() => Image already exists");
                        }


                    })
                    .catch(function (error: any) {
                        console.log("Fetching latest data => " + error);
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

    }, [getMap])


    return (
        <div>
            <h1>
                <div className='sidebarStyle'>
                    Oversigt<br />
                </div>

                <div ref={mapContainer} className="mapContainer"> </div>
            </h1>
        </div>
    )
}

export default Container;