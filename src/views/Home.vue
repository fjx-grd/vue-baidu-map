<template>
  <div class="home">
    <div id="map" />
  </div>
</template>

<script>
import BMap from 'BMap'

let convertor = new BMap.Convertor();
let map
export default {
  name: 'Map',
  data () {
    return {
      point: {
        latitude: 116.404,
        longitude: 39.915
      }
    }
  },
  mounted () {
    this.loadPoint()
  },
  methods: {
    loadPoint () {
      let $this = this
      function success (pos) {
        var crd = pos.coords
        console.log('Your current position is:')
        console.log('Latitude : ' + crd.latitude)
        console.log('Longitude: ' + crd.longitude)
        console.log('More or less ' + crd.accuracy + ' meters.')
        $this.point.latitude = crd.latitude
        $this.point.longitude = crd.longitude
        $this.initMap()
      }
      function error (err) {
        console.warn('ERROR(' + err.code + '): ' + err.message)
      }
      navigator.geolocation.getCurrentPosition(success, error)
    },
    initMap () {
      console.log(this.point)
      let translateCallback = function (data) {
        if (data.status === 0) {
          let point = data.points[0]
          // 地图初始化
          map = new BMap.Map('map')
          map.centerAndZoom(point, 15)
          map.addControl(new BMap.NavigationControl())
          var marker = new BMap.Marker(point)
          map.addOverlay(marker)
          var label = new BMap.Label('你当前的位置', { offset: new BMap.Size(20, -10) })
          //添加百度label
          marker.setLabel(label)
          map.setCenter(data.points[0])
        } else {
          console.error('初始化地图失败')
        }
      }
      this.convert(translateCallback)
    },
    convert (translateCallback) {
      console.log('convert point')
      var pointArr = [];
      let point = new BMap.Point(this.point.longitude, this.point.latitude)
      pointArr.push(point);
      convertor.translate(pointArr, 1, 5, translateCallback)
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
