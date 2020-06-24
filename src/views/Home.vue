<template>
  <div class="home">
    <div id="map" />
  </div>
</template>

<script>
import BMap from 'BMap'

let map
export default {
  name: 'Map',
  data () {
    return {
      point: {
        latitude: 116.331398,
        longitude: 39.897445
      }
    }
  },
  mounted () {
    this.loadPoint()
  },
  methods: {
    loadPoint () {
      map = new BMap.Map("map");
      let point = new BMap.Point(this.point.longitude, this.point.latitude)
      map.centerAndZoom(point, 15);
      map.addControl(new BMap.NavigationControl())

      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == 0) {
          let mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          var label = new BMap.Label('你当前的位置', { offset: new BMap.Size(20, -10) })
          //添加百度label
          mk.setLabel(label)
          map.panTo(r.point);
          map.setCenter(r.point)
          console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
        }
        else {
          console.error('获取位置失败：' + this.getStatus());
        }
      }, { enableHighAccuracy: true })
    }
  }
}
</script>
<style scoped>
.home {
  text-align: center;
}
#map {
  width: 400px;
  height: 400px;
}
</style>
