<script>
// import { greeter } from "../../utils/wink.ts";
export default {
  name: "MapApi",
  data() {
    return {
      map: null,
      trackAni: null,
      process: 0,
      duration: 8000, //动画播完总长
      path: [
        {
          lng: 116.297611,
          lat: 40.047363,
        },
        {
          lng: 116.302839,
          lat: 40.048219,
        },
        {
          lng: 116.308301,
          lat: 40.050566,
        },
        {
          lng: 116.305732,
          lat: 40.054957,
        },
        {
          lng: 116.304754,
          lat: 40.057953,
        },
        {
          lng: 116.306487,
          lat: 40.058312,
        },
        {
          lng: 116.307223,
          lat: 40.056379,
        },
      ],
      options: [
        {
          value: 1,
          label: "1倍速",
        },
        {
          value: 2,
          label: "2倍速",
        },
        {
          value: 4,
          label: "4倍速",
        },
      ],
      plus: 1,
    };
  },
  mounted() {
    this.baiduMap();
    this.routereplay();
  },
  watch: {
    plus(v1, v2) {
      this.speedplus(8000 / v1);
    },
  },
  methods: {
    //加载百度地图
    baiduMap() {
      // 按住鼠标右键，修改倾斜角和角度
      this.map = new BMapGL.Map("contair"); // 创建Map实例
      this.map.centerAndZoom(new BMapGL.Point(116.28019, 40.049191), 19);
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.map.setMapStyle({ style: "midnight" });
      this.map.addControl(
        new BMapGL.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
        })
      );
      // this.map.setHeading(64.5);
      // this.map.setTilt(73);
    },
    //轨迹回放
    routereplay() {
      this.map.clearOverlays();
      let that = this;
      var point = [];
      for (var i = 0; i < this.path.length; i++) {
        point.push(new BMapGL.Point(this.path[i].lng, this.path[i].lat));
      }
      //添加起点标志
      var markerS = new BMapGL.Marker(point[0]);
      var labelS = new BMapGL.Label("", { offset: new BMapGL.Size(-20, -20) });
      // labelS.setStyle({
      //   background: 'white', color: 'black', border: '1px solid', fontSize: '15px',
      // });
      markerS.setLabel(labelS);
      this.map.addOverlay(markerS);
      //小车行驶图标
      var drivingPoint = new BMapGL.Icon(
        "http://developer.baidu.com/map/jsdemo/img/car.png",
        new BMapGL.Size(52, 26),
        {
          anchor: new BMapGL.Size(27, 13),
          imageSize: new BMapGL.Size(52, 26),
        }
      );
      //终点图标
      var terminalPoint = new BMapGL.Icon(
        "endMap.png",
        new BMapGL.Size(45, 45),
        {
          anchor: new BMapGL.Size(20, 45),
          imageSize: new BMapGL.Size(45, 45),
        }
      );
      var pl = new BMapGL.Polyline(point);
      this.trackAni = new BMapGLLib.TrackAnimation(that.map, pl, {
        overallView: true,
        tilt: 30,
        duration: that.duration,
        delay: 300,
      });
      setTimeout(this.start(), 3000);
    },
    start() {
      this.trackAni.start();
    },
    pauseAni() {
      this.trackAni.pause();
    },
    continueAni() {
      this.trackAni.continue();
    },
    speedplus() {
      this.trackAni.setDuration(4000);
    },
    processchange(e) {
      let that = this;
      this.trackAni.pause();
      this.map.clearOverlays();
      let partindex =
        parseInt(this.path.length * (e / 100)) == 0
          ? 1
          : parseInt(this.path.length * (e / 100));
      var point = [];
      for (let i = 0; i < partindex; i++) {
        point.push(new BMapGL.Point(this.path[i].lng, this.path[i].lat));
      }
      var pl = new BMapGL.Polyline(point);
      let trackAni2 = new BMapGLLib.TrackAnimation(that.map, pl, {
        overallView: true,
        tilt: 30,
        duration: 500,
        delay: 300,
      });
      trackAni2.start();
    },
    //进度条跟随
    sliderfllow() {
      //每次
    },
  },
};
</script>
<template>
  <div id="map">
    <div id="contair"></div>
    <div class="btn">
      <el-button @click="routereplay">回放</el-button>
      <el-button @click="continueAni">继续</el-button>
      <el-button @click="pauseAni">暂停</el-button>
      <el-select
        v-model="plus"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-slider
        v-model="process"
        @change="processchange"
      ></el-slider>
    </div>
  </div>
</template>


<style lang="less" scoped>
#map {
  width: 100%;
  height: 100%;
  position: relative;
}
#contair {
  width: 100%;
  height: 100%;
}
.btn {
  position: absolute;
  bottom: 10px;
  left: 20px;
  z-index: 999999;
}
#controller {
  width: 100%;
  border-bottom: 3px outset;
  height: 30px;
  filter: alpha(Opacity=100);
  -moz-opacity: 1;
  opacity: 1;
  z-index: 10000;
  background-color: lightblue;
}
#container {
  height: 100%;
}
/* 去除百度地图版权那行字 和 百度logo */
/deep/.BMap_cpyCtrl {
  display: none !important;
}
/deep/ .anchorBL {
  display: none !important;
}
</style>
