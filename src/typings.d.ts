declare module "*.geojson" {
    const value: any;
    export default value;
}


declare module 'mapbox-gl-draw-passing-mode'{

  import {IControl} from 'mapbox-gl'

  class MapBoxDraw implements IControl{

    constructor(options?:{
      userProperties: bool,
      displayControlsDefault: bool,
      modes: Object,
    })

    }
    export = MapboxDraw;

}

declare module 'mapbox-gl-draw-cut-polygon-mode'{

  import {IControl} from 'mapbox-gl'

  class MapBoxDraw implements IControl{

    constructor(options?:{
      userProperties: bool,
      displayControlsDefault: bool,
      modes: object,
    })

    }
    export = MapboxDraw;
  }


declare module '@mapbox/mapbox-gl-draw' {


    import {Feature, FeatureCollection} from 'geojson'
      import {IControl} from 'mapbox-gl'
      import {IMapboxDrawControls} from '@mapbox/mapbox-gl-draw'
    
      namespace MapboxDraw {
        export interface IMapboxDrawControls {
          point?: boolean,
          line_string?: boolean,
          polygon?: boolean
          trash?: boolean,
          combine_features?: boolean,
          uncombine_features?: boolean,
          modes?: any
        }
      }
    
      class MapboxDraw implements IControl {
    
        getDefaultPosition: () => string
        static modes: any;
    
        constructor(options?: {
          displayControlsDefault?: boolean,
          keybindings?: boolean,
          touchEnabled?: boolean,
          boxSelect?: boolean,
          clickBuffer?: number,
          touchBuffer?: number,
          controls?: IMapboxDrawControls,
          styles?: object[],
          modes?: object,
          defaultMode?: string,
          userProperties?: boolean
        });
    
        public add(geojson: object): string[]
    
        public get(featureId: string): Feature | undefined
    
        public getFeatureIdsAt(point: { x: number, y: number }): string[]
    
        public getSelectedIds(): string[]
    
        public getSelected(): FeatureCollection
    
        public getSelectedPoints(): FeatureCollection
    
        public getAll(): FeatureCollection
    
        public delete(ids: string | string[]): this
    
        public deleteAll(): this
    
        public set(featureCollection: FeatureCollection): string[]
    
        public trash(): this
    
        public combineFeatures(): this
    
        public uncombineFeatures(): this
    
        public getMode(): string
    
        public changeMode(mode: string, options?: object): this
    
        public setFeatureProperty(featureId: string, property: string, value: any): this
    
        onAdd(map: mapboxgl.Map): HTMLElement
    
        onRemove(map: mapboxgl.Map): any
    
      }
    
      export = MapboxDraw
    }