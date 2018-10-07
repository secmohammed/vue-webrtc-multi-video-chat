export const setRoom = (state, room) => {
  state.room = room
}

export const setMeName = (state, name) => {
  state.state.name = name
}

export const setMuted = (state, muted) => {
  state.state.muted = muted
}

export const setPaused = (state, paused) => {
  state.state.paused = paused
}

export const addPeer = (state, { video, peer }) => {
  state.clients.push({ video, peer })
}

export const removePeer = (state, peer) => {
  state.clients = state.clients.filter((p) => {
    return p.peer.id !== peer.id
  })
}
