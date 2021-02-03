import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Container.css';
import '../../resources/geoJSONfile/prd-.geojson';

mapboxgl.accessToken = 'pk.eyJ1IjoibmF2aWFpci11dG0iLCJhIjoiY2tpdWtxdzJqMGNiMzJ0bnpmYzZicmJsMiJ9.QaY60enzHFot0poi7E2FCw';

export interface GeoJson{
    type: string,
    data: {
        type: string,
        geometry: {
            type: string,
            coordinates: [[[number, number]]]
        }
    }
}

let geoObj: GeoJson = JSON.parse('../../resources/prd-aerodrome2_outer.geojson');


const geojsonTest:mapboxgl.AnySourceData =  {
    'type': 'geojson',
    'data': {
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',
            'coordinates': [
                [
                    [-67.13734351262877, 45.137451890638886],
                    [-66.96466, 44.8097],
                    [-68.03252, 44.3252],
                    [-69.06, 43.98],
                    [-70.11617, 43.68405],
                    [-70.64573401557249, 43.090083319667144],
                    [-70.75102474636725, 43.08003225358635],
                    [-70.79761105007827, 43.21973948828747],
                    [-70.98176001655037, 43.36789581966826],
                    [-70.94416541205806, 43.46633942318431],
                    [-71.08482, 45.3052400000002],
                    [-70.6600225491012, 45.46022288673396],
                    [-70.30495378282376, 45.914794623389355],
                    [-70.00014034695016, 46.69317088478567],
                    [-69.23708614772835, 47.44777598732787],
                    [-68.90478084987546, 47.184794623394396],
                    [-68.23430497910454, 47.35462921812177],
                    [-67.79035274928509, 47.066248887716995],
                    [-67.79141211614706, 45.702585354182816],
                    [-67.13734351262877, 45.137451890638886],
                ]
            ]
        },
        properties: {}
    }
}


export const Container: React.FC = (props) => {
    const [getLatLng, setLatLng] = useState<{ lat: number, long: number }>({ lat: 34, long: 5 });
    const [getMap, setMap] = useState<mapboxgl.Map>();
    const mapContainer = useRef<HTMLDivElement>(null);
    const [getZoom, setZoom] = useState<number>(2);

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
            console.log(geoObj);

            console.log('test')
            getMap.addSource('maine',geojsonTest);
            getMap.addLayer({
                'id': 'maine',
                'type': 'fill',
                'source': 'maine',
                'layout': { },
                'paint': {
                    'fill-color': '#088',
                    'fill-opacity': 0.8,
                }
            });
        })
    },[getMap])

    return (
        <div>
            <h1>
                <div className='sidebarStyle'> 
                    Zoom: { getZoom }
                    </div>
                <div ref={mapContainer} className="mapContainer"> </div>
            </h1>
        </div>
    )
}

export default Container;