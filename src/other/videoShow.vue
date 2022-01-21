<style lang="scss">
.ui-videoShow {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;

  .ui-videoShow-video-tablet {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    background-color: #fff;
  }

  .ui-videoShow-video-mobile,
  .ui-videoShow-video-tablet2 {
    display: none;
    height: 100%;
    width: 100%;
    object-fit: cover;
    background-color: #fff;
  }

  .ui-videoShow-controller {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 100;

    .ui-videoShow-controller-btn {
      cursor: pointer;
      position: absolute;
      right: 20px;
      bottom: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.14) 3px 3px 8px 0px;
        background-color: rgba(14, 14, 14, 0.53);
      }
    }
  }
}

// Mobile
.ui-videoShow-mobile {
  .ui-videoShow-video-tablet {
    display: none;
  }

  .ui-videoShow-controller {
    .ui-videoShow-controller-btn {
      position: absolute;
      right: 16px;
      bottom: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;

      img {
        width: 20px;
      }

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.14) 3px 3px 8px 0px;
        background-color: rgba(14, 14, 14, 0.53);
      }
    }
  }

  .ui-videoShow-canvas {
    width: 100%;
    height: 100%;
    // visibility: hidden;
  }

  .ui-videoShow-controller-wechat {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    button {
      width: 300px;
      height: 44px;
      background-color: rgba(238, 238, 238, 0.55);
      border-radius: 6px;
      color: #fff;
      position: absolute;
      top: 250px;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
  }
}

// 浏览器兼容
.ui-videoShow-mobile-ios {
  // height: calc(100vh - 75px);
  // min-height: calc(100vh - 75px) !important;
  .ui-videoShow-canvas {
    width: 100%;
    height: 100%;
  }

  .ui-videoShow-mobile-ios-safe-fix {
    // width: 100%;
    // height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    .ui-videoShow-controller {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
}

// animate
</style>

<style scoped>
/* KEYFRAMES */
@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0.25;
    transform: scale(0.75);
  }
}

/* GRID STYLING */

* {
  box-sizing: border-box;
}

.spinner-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
</style>

<template>
  <div class="ui-videoShow"
       :class="[
      {
        'ui-videoShow-mobile': mediaType == 'mobile' || mediaType == 'other',
        'ui-videoShow-mobile-ios': isIos && !isWeixin,
      },
    ]">
    <video v-if="mediaType == 'web'"
           ref="video"
           class="ui-videoShow-video-tablet"
           muted
           autoplay="autoplay"
           loop="loop"
           :poster="posterTablet"
           controlslist="nodownload"
           @play="removeSpin"
           @playing="removeSpin"
           @canplay="removeSpin">
      <source :src="srcTablet"
              type="video/mp4" />
    </video>
    <video v-else-if="mediaType == 'mobile'"
           ref="video"
           class="ui-videoShow-video-mobile"
           loop
           muted
           autoplay="autoplay"
           controlslist="nodownload"
           loopx5-video-player-type="h5"
           x5-video-orientation="h5"
           x5-video-player-fullscreen="true"
           x-webkit-airplay="true"
           x5-playsinline="true"
           webkit-playsinline="true"
           playsinline="true"
           :poster="posterPhone"
           @play="removeSpin"
           @playing="removeSpin"
           @canplay="removeSpin">
      <source :src="srcPhone"
              type="video/mp4" />
    </video>
    <video v-else-if="mediaType == 'other'"
           ref="video"
           class="ui-videoShow-video-tablet2"
           loop
           muted
           autoplay="autoplay"
           controlslist="nodownload"
           loopx5-video-player-type="h5"
           x5-video-orientation="h5"
           x5-video-player-fullscreen="true"
           x-webkit-airplay="true"
           x5-playsinline="true"
           webkit-playsinline="true"
           playsinline="true"
           :poster="posterTablet"
           @play="removeSpin"
           @playing="removeSpin"
           @canplay="removeSpin">
      <source :src="srcTablet"
              type="video/mp4" />
    </video>
    <canvas v-if="mediaType != 'web'"
            class="ui-videoShow-canvas"
            ref="myCanvas"></canvas>

    <div :class="[
        {
          'ui-videoShow-mobile-ios-safe-fix': isIos,
        },
      ]">
      <div class="ui-videoShow-controller">
        <div class="ui-videoShow-controller-btn flex_c"
             @click="toggleMute">
          <bp-icon v-if="audioType == 'pause'"
                   color="rgba(255,255,255,0.82)"
                   name="ui-mute"></bp-icon>
          <bp-icon v-if="audioType == 'play'"
                   color="rgba(255,255,255,0.82)"
                   name="ui-unmute"></bp-icon>
        </div>
      </div>
    </div>

    <div class="ui-videoShow-controller-wechat"
         v-if="wechatType && isWeixin">
      <img :src="posterPhone"
           alt />
      <button class="btn-statrt"
              @click="handleStart">立即了解</button>
    </div>

  </div>
</template>

<script lang="js">
  const video_mobile_size = {
    w: 592.0,
    h: 1280.0
  };
  const video_size = {
    w: 1905.0,
    h: 1072.0
  };


  export default {
    props: {
      srcTablet: { type: String, },
      srcPhone: { type: String, },
      posterTablet: { type: String, },
      posterPhone: { type: String, },
    },
    data() {
      return {
        audioType: "pause",
        mediaType: "web", // "web" | "mobile" | "other".
        isIos: false,
        isWeixin: false,
        wechatType: true,
      };
    },
    mounted() {
      this.initLoad();

      $Febs.dom.addEventListener(window, "orientationchange", this.onresize, false);
      if (!$Febs.utils.browserIsIOS()) {
        $Febs.dom.addEventListener(window, "resize", this.onresize);
      }
    },
    methods: {
      // 是否静音
      toggleMute() {
        let video = this.$refs.video;
        if (video.muted) {
          video.muted = false;
          this.audioType = "play";
        } else {
          video.muted = true;
          this.audioType = "pause";
        }
      },
      unmute() {
        let video = this.$refs.video;
        if (video.muted) {
          video.muted = false;
          this.audioType = "play";
        }
      },
      mute() {
        let video = this.$refs.video;
        if (video.muted) {
          video.muted = true;
          this.audioType = "pause";
        }
      },
      handleStart() {
        this._canvasPlay(true);
        this.$timer.setTimeout(() => {
          this.wechatType = false;
        }, 800);
      },
      //
      removeSpin(e) {
        if ($Febs.utils.browserIsIOS()) {
          this.$timer.setTimeout(() => {
            $Febs.$('.spinner-box').css('display', "none");
          }, 40 * 1);
        } else {
          $Febs.$('.spinner-box').css('display', "none");
        }
      },
      _canvasPlay(unmuted) {
        if (this.$timer) {
          this.$timer.clearAllInterval();
        }
        $Febs.$('.spinner-box').css('display', "");
        this.$nextTick(() => {
          let canvas = this.$refs.myCanvas;
          let video;

          if (this.mediaType == "mobile") {
            video = this.$refs.video;
            canvas.width = video_mobile_size.w;
            canvas.height = video_mobile_size.h;
          } else {
            video = this.$refs.video;
            canvas.width = video_size.w;
            canvas.height = video_size.h;
          }


          let canvasScale = canvas.width / window.innerWidth;

          let context = canvas.getContext("2d");
          video.pause();
          video.currentTime = 0;
          
          // fix for safari.
          if ($Febs.utils.browserIsIOS()) {
            let newSrc = $Febs.$($Febs.$(video).children('source')[0]).attr('src');
            video.src = "";
            video.src = newSrc;
            video.load();
          } else {
            video.load();
          }
          video.play();

          let offsetX = 0;
          let offsetY = 0;
          let scaleX = 0;
          let cw = 0;
          let ch = 0;

          // w > h
          if (window.innerWidth >= window.innerHeight) {
            let s1 = window.innerWidth / window.innerHeight;
            let s2 = video_size.w / video_size.h;
            if (s1 < s2) {
              s1 = window.innerHeight * canvasScale * s2 - window.innerWidth * canvasScale;
              scaleX = s1 / 2 / (window.innerWidth * canvasScale);
              offsetX = scaleX * video_size.w;
            } else {
              s1 = window.innerWidth * canvasScale / s2 - window.innerHeight * canvasScale;
              scaleX = s1 / 2 / (window.innerHeight * canvasScale + s1);
              offsetY = scaleX * video_size.h;
            }

            cw = video_size.w - offsetX * 2;
            ch = video_size.h - offsetY * 2;
          }
          // h > w
          else {
            let s1 = window.innerWidth / window.innerHeight;
            let s2 = video_mobile_size.w / video_mobile_size.h;
            if (s1 < s2) {
              s1 = window.innerHeight * canvasScale * s2 - window.innerWidth * canvasScale;
              scaleX = s1 / 2 / (window.innerWidth * canvasScale);
              offsetX = scaleX * video_mobile_size.w;
            } else {
              s1 = window.innerWidth * canvasScale / s2 - window.innerHeight * canvasScale;
              scaleX = s1 / 2 / (window.innerHeight * canvasScale + s1);
              offsetY = scaleX * video_mobile_size.h;
            }

            cw = video_mobile_size.w - offsetX * 2;
            ch = video_mobile_size.h - offsetY * 2;
          }

          let callRemoveSpin = false; // for ios.
          this.$timer.setInterval(() => {
            if (video.currentTime > 0 && !callRemoveSpin) {
              if (unmuted) {
                this.unmute();
              }
              callRemoveSpin = true;
              this.removeSpin({
                e: {
                  target: video,
                  type: 'inRender'
                }
              });
            }
            context.drawImage(video, offsetX, offsetY, cw, ch, 0, 0, canvas.width, canvas.height);
          }, 40);
        });
      },
      initLoad() {
        // this._videoInit();
        if ($Febs.utils.browserIsMobile()) {
          let aa = this.$el;
          aa.style.height = $Febs.dom.getDocumentPort().height + "px";

          if (
            $Febs.dom.getDocumentPort().width > $Febs.dom.getDocumentPort().height
          ) {
            this.mediaType = "other";
          } else {
            this.mediaType = "mobile";
          }

          if ($Febs.utils.browserIsWeixin()) {
            this.isWeixin = true;
          }
          if ($Febs.utils.browserIsIOS()) {
            this.isIos = true;
          }
          this._canvasPlay();
        } else {
          this.mediaType = "web";
          let video = this.$refs.video;
          this.mute();
          video.play();

          if ($Febs.utils.browserIsEdge()) {
            let unmute = () => {
              this.unmute();
              video.removeEventListener('canplay', unmute);
            }
            video.addEventListener('canplay', unmute);
          } else if ($Febs.utils.browserIsChrome() || $Febs.utils.browserIsFirefox()) {
            this.$timer.setTimeout(() => {
              $Febs.$('.spinner-box').css('display', "none");
            }, 2000);
          }
        }
      },
      // 监听窗口变化
      onresize() {
        if ($Febs.utils.browserIsIOS()) {
          this.$timer.setTimeout(() => {
            this.initLoad();
          }, 600);
        } else {
          this.initLoad();
        }
      },
    },
  }
</script>