import actions from '../../src/store/actions'
import initialState from '../../src/store/state'

test('add player to players', async () => {
  const joinGameChannelMock = jest.fn(store => console.log(store));

  actions.joinGameChannel = joinGameChannelMock

  const some = {
    dispatch: joinGameChannelMock
  }

  const initGame = {
    player: "hands",
    gameName: "bla",
    token: "ssadfasfd23"
  }

  await actions.initGame(some, initGame)

  console.log(joinGameChannelMock.mock.calls)

})
