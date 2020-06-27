<template>
  <div class="home">
    <div id="map" />
  </div>
</template>

<script>
import BMap from 'BMap'
import CCBBridge from 'CCBBridge'

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
      CCBBridge.requestNative({
        action: 'position',
        params: {
          needLocae: true,
          needCityLocation: false
        }
      }, this.positionCallback)
    },
    positionCallback (data, state, msg) {
      console.log(data, state)
      if (state === 0) {
        this.point.latitude = data.ltt
        this.point.longitude = data.lgt
        this.convert()
      } else {
        console.error('获取经纬度失败: ', msg)
      }
    },
    convert () {
      console.log('convert point', this.point)
      var pointArr = [];
      let point = new BMap.Point(this.point.longitude, this.point.latitude)
      pointArr.push(point);
      convertor.translate(pointArr, 1, 5, this.translateCallback)
    },
    translateCallback (data) {
      if (data.status === 0) {
        let point = data.points[0]
        // 地图初始化
        map = new BMap.Map('map')
        map.centerAndZoom(point, 15)
        map.addControl(new BMap.NavigationControl())
        var marker = new BMap.Marker(point)
        map.addOverlay(marker)
        var label = new BMap.Label('你当前的位置', { offset: new BMap.Size(20, -10) })
        // 添加百度label
        marker.setLabel(label)
        map.setCenter(data.points[0])
      } else {
        console.error('初始化地图失败')
      }
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
