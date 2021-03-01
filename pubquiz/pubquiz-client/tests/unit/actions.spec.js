import actions from '../../src/store/actions'
import initialState from '../../src/store/state'

test('add player to players', async () => {
  const joinGameChannelMock = jest.fn(store => console.log(store));

  actions.joinGameChannel = joinGameChannelMock

  const some = {
    dispatch: joinGameChannelMock
  }

  const initGame = {
    player: "Hans",
    gameName: "gameBla1",
    token: "tokenbla3"
  }

  await actions.initGame(some, initGame)

  expect(joinGameChannelMock.mock.calls.length).toEqual(5)
  expect(joinGameChannelMock.mock.calls[0]).toEqual(['setPlayer', initGame.player])
  expect(joinGameChannelMock.mock.calls[1]).toEqual(['setToken', initGame.token])
  expect(joinGameChannelMock.mock.calls[2]).toEqual(['setGameName', initGame.gameName])
  expect(joinGameChannelMock.mock.calls[3]).toEqual(['setAdmin', true])
  expect(joinGameChannelMock.mock.calls[4]).toEqual(['joinGameChannel'])



})
