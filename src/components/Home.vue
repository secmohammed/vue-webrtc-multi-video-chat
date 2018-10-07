<template>
  <div class="home">
    <form action="#" class="join" @submit.prevent="join">

      <h1>Start chatting.</h1>

      <label for="room" class="label">Room ID</label>
      <input type="text" class="input" name="room" placeholder="e.g. ABC-123-456" v-model.trim="room">

      <label for="name" class="label">Your name</label>
      <input type="text" class="input" name="name" placeholder="e.g. Alex Garrett-Smith" v-model.trim="name">

      <button type="submit" class="button button--primary">
        Join
      </button>
    </form>
  </div>
</template>

<script>
  import uuid from 'uuid/v4'
  import { mapMutations } from 'vuex'
  import SimpleWebRTC from 'simplewebrtc'

  export default {
    data () {
      return {
        room: this.$route.query.room || uuid(),
        name: ''
      }
    },
    methods: {
      ...mapMutations([
        'setMeName'
      ]),
      join () {
        this.setMeName(this.name)

        window.webrtc = new SimpleWebRTC({
          localVideoEl: '',
          remoteVideosEl: '',
          autoRequestMedia: true,
          nick: this.name
        })

        this.$router.push({
          name: 'room',
          params: {
            room: this.room
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '~styles/app';

  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .join {
    width: 100%;
    max-width: 400px;
  }
</style>
