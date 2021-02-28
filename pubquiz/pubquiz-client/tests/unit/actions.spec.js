import mutations from '../../src/store/actions'
import initialState from '../../src/store/state'

test('add player to players', () => {
  const state = Object.assign(initialState, {

  })

  mutations.updatePlayers(state, 'Hans')
  expect(state.players.length).toBe(1)
})
