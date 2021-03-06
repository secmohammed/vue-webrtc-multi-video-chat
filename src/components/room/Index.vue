<template>
  <div class="room">
    <div class="people" id="people">
      <div class="person">
        <div class="person__video">
          <video ref="me"></video>
        </div>
        <div class="person__name">
          {{ state.name }}
        </div>
      </div>
      <person v-for="client in clients" :client="client" :key="client.peer.id"></person>
    </div>
    <controls></controls>
  </div>
</template>

<script>
  import Person from './partials/Person'
  import Controls from './partials/Controls'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    props: ['room'],
    components: {
      Person,
      Controls
    },
    computed: {
      ...mapGetters({
        clients: 'getClients',
        state: 'getState'
      })
    },
    methods: {
      ...mapMutations([
        'removePeer',
        'addPeer'
      ])
    },
    mounted () {
      window.webrtc.joinRoom(this.room)

      window.webrtc.on('videoAdded', (video, peer) => {
        this.addPeer({ video, peer })
      })

      window.webrtc.on('videoRemoved', (video, peer) => {
        this.removePeer(peer)
      })

      window.webrtc.on('localStream', (stream) => {
        let attachMediaStream = require('attachmediastream')

        attachMediaStream(stream, this.$refs.me, {
          autoplay: true,
          mirror: true,
          muted: true
        })
      })
    }
  }
</script>

<style lang="scss">
  .room {
    height: 100%;
    position: relative;
  }

  .people {
    display: flex;
    flex-wrap: wrap;
    vertical-align: baseline;
    width: 100%;
    padding: 40px;
  }

  video {
    width: 100%;
  }

  .person {
    position: relative;
    margin: 0 1% 60px 1%;
    width: 100%;

    @media (min-width: 576px) and (max-width: 767px) {
      width: 49%;

      &:nth-of-type(2n) {
        margin-right: 0;
      }

      &:nth-of-type(2n + 1) {
        margin-left: 0;
      }
    }

    @media (min-width: 768px) and (max-width: 991px) {
      width: 32%;

      &:nth-of-type(3n) {
        margin-right: 0;
      }

      &:nth-of-type(3n + 1) {
        margin-left: 0;
      }
    }

    @media (min-width: 992px) {
      width: 23.5%;

      &:nth-of-type(4n) {
        margin-right: 0;
      }

      &:nth-of-type(4n + 1) {
        margin-left: 0;
      }
    }

    &__video {
      background-color: #ccc;
      margin-bottom: 10px;
      box-shadow: 0 10px 25px 0 rgba(49,49,93,0.2);
      border-radius: 3px;
    }

    &__name {
      text-align: center;
      font-weight: 600;
    }
  }
</style>
