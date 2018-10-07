<template>
  <ul class="controls">
    <li class="controls__item">
      <a href="#" class="controls__link" @click.prevent="unmuteMe" v-if="state.muted">
        Unmute me
      </a>
      <a href="#" class="controls__link" @click.prevent="muteMe" v-if="!state.muted">
        Mute me
      </a>
    </li>
    <li class="controls__item">
      <a href="#" class="controls__link" @click.prevent="unpauseMe" v-if="state.paused">
        Unpause me
      </a>
      <a href="#" class="controls__link" @click.prevent="pauseMe" v-if="!state.paused">
        Pause me
      </a>
    </li>
  </ul>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        room: 'getRoom',
        state: 'getState'
      })
    },
    methods: {
      ...mapMutations([
        'setPaused',
        'setMuted'
      ]),
      muteMe () {
        window.webrtc.mute()
        this.setMuted(true)
      },
      unmuteMe () {
        window.webrtc.unmute()
        this.setMuted(false)
      },
      pauseMe () {
        window.webrtc.pause()
        this.setPaused(true)
      },
      unpauseMe () {
        window.webrtc.resume()
        this.setMuted(false)
        this.setPaused(false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .controls {
    position: fixed;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    background-color: #2b9cf2;
    color: #fff;
    margin: 0;
    list-style-type: none;
    padding: 0;

    &__item {
      flex: 1;
      font-weight: 600;
      border-right: 1px solid #0e83dc;
    }

    &__link {
      display: block;
      color: #fff;
      text-decoration: none;
      padding: 15px 18px;
      height: 100%;
      width: 100%;
      text-align: center;

      &:hover {
        background-color: #0e83dc;
      }
    }
  }
</style>
