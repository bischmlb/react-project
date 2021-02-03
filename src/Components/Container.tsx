import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Container.css';

const fs = require('../geoJSONfile/prd-aerodrome2_outer.geojson');

const arr:any = [];


fs.features.forEach((data: any) => {
    arr.push({
        type: 'geojson',
        data
        }
    );
});





mapboxgl.accessToken = 'pk.eyJ1IjoibmF2aWFpci11dG0iLCJhIjoiY2tpdWtxdzJqMGNiMzJ0bnpmYzZicmJsMiJ9.QaY60enzHFot0poi7E2FCw';

const geojsonTest2:mapboxgl.GeoJSONSourceRaw =  {
    type: 'geojson',
    data: '../geoJSONfile/prd-aerodrome2_outer.json'
}

const geojsonTest:mapboxgl.AnySourceData =  {
    type: 'geojson',
    data: {
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [
                [
                    [12.584910336622954, 55.681623055314354],
                    [12.584769680248062, 55.68139609459595],
                    [12.584709027909616, 55.68115812332113],
                    [12.584730639951596, 55.68091801696616],
                    [12.58483370861053, 55.68068473041438],
                    [12.585014388394896, 55.68046696400678],
                    [12.585265939713917, 55.680272839113634],
                    [12.585578980368687, 55.68010959531809],
                    [12.585941835506683, 55.67998332049351],
                    [12.5864384716525, 55.679845881087935],
                    [12.586851263798179, 55.679759236544434],
                    [12.587286345279349, 55.67972051232204],
                    [12.587726403062735, 55.67973124953895],
                    [12.58815392601319, 55.67979102114718],
                    [12.588551901488131, 55.67989744888632],
                    [12.588904492150046, 55.680046297856435],
                    [12.589197666099265, 55.680231644957786],
                    [12.589419755273532, 55.68044611450919],
                    [12.58961417477622, 55.68068604646836],
                    [12.589757211890277, 55.68092322071049],
                    [12.589813132415834, 55.681171739033665],
                    [12.58980679346051, 55.6812190603057],
                    [12.589814686810003, 55.68124704152988],
                    [12.589797354031903, 55.68149236002209],
                    [12.58969496278168, 55.68173099012222],
                    [12.589511493921586, 55.68195365020663],
                    [12.589254082274646, 55.68215167964596],
                    [12.588932739269262, 55.68231737573885],
                    [12.588700008964226, 55.682396612912946],
                    [12.588549284639454, 55.68246540836341],
                    [12.588109728207291, 55.682587615994635],
                    [12.58796920453933, 55.6826162605741],
                    [12.587530662545731, 55.68267792182904],
                    [12.587079037920152, 55.68268794896751],
                    [12.586633253976311, 55.682645922065575],
                    [12.586211989059104, 55.682553602309305],
                    [12.58583289369396, 55.6824148581366],
                    [12.585511850893175, 55.682235503062756],
                    [12.585453865630585, 55.68218613638095],
                    [12.585386685855447, 55.68214423872979],
                    [12.585160844030032, 55.68192869904568],
                    [12.584910336622954, 55.681623055314354],
                    
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
                console.log(arr[1])
                console.log(geojsonTest)
                const count = 0;
                arr.forEach((element:any) => {
                    console.log('all_geojson')
                    getMap.addSource('all_geojson', element);
                    getMap.addLayer({
                        'id': 'all_geojson',
                        'type': 'fill',
                        'source': 'all_geojson',
                        'layout': { },
                        'paint': {
                            'fill-color': '#000',
                            'fill-opacity': 0.8,
                        }
                    });
                });
        })
    },[getMap])

    return (
        <div>
            <h1>
                <div className='sidebarStyle'> 
                    Geo Zones Denmark
                    </div>
                <div ref={mapContainer} className="mapContainer"> </div>
            </h1>
        </div>
    )
}

export default Container;