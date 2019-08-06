<template>
  <div id="app">
    <div id="map" />
    <div class="controls">
      <button @click="changeColor">Change Color</button>
      <button @click="dropPoints">Place Markers and Zoom</button>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import mapStyles from './map-styles';

export default {
  name: 'app',

  mounted () {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
    });
    this.draw = new MapboxDraw({
      controls: {
        line_string: false,
        point: false,
      },
      defaultMode: 'draw_polygon',
      styles: mapStyles,
    });
    window.draw = this.draw;
    this.map.addControl(this.draw, 'top-right');

    this.markers = [];
  },

  methods: {
    changeColor () {
      // FIXME: how do we change the color/style of a polygon?
    },

    dropPoints () {
      const pois = [
        {
          center: [-87.6240594, 41.8655045],
          label: 'Cool Place',
        },
        {
          center: [-87.6328057, 41.871236],
          label: 'Another Place',
        },
        {
          center: [-87.6256617, 41.89258],
          label: 'Up North',
        },
      ];

      for (const poi of pois) {
        const marker = new mapboxgl.Marker({
          color: '#e15d26',
        })
          .setLngLat(poi.center)
          .addTo(this.map);
        const popup = new mapboxgl.Popup().setHTML(`<b>${poi.label}</b>`);

        marker.setPopup(popup);
        this.markers.push(marker);
      }

      const bounds = new mapboxgl.LngLatBounds(
        this.markers.map(marker => marker.getLngLat()),
      );
      this.map.fitBounds(bounds);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}

.controls {
  margin-top: 1rem;
}

.controls button {
  font-size: 1.5rem;
}
</style>
