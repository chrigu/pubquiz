import actions from '../../src/store/actions'
import initialState from '../../src/store/state'

test('initalize game', async () => {
  const dispatchMock = jest.fn(store => 1 + 1);

  const store = {
    dispatch: dispatchMock
  }

  const initGame = {
    player: "Hans",
    gameName: "gameBla1",
    token: "tokenbla3"
  }

  await actions.initGame(store, initGame)

  expect(dispatchMock.mock.calls.length).toEqual(5)
  expect(dispatchMock.mock.calls[0]).toEqual(['setPlayer', initGame.player])
  expect(dispatchMock.mock.calls[1]).toEqual(['setToken', initGame.token])
  expect(dispatchMock.mock.calls[2]).toEqual(['setGameName', initGame.gameName])
  expect(dispatchMock.mock.calls[3]).toEqual(['setAdmin', true])
  expect(dispatchMock.mock.calls[4]).toEqual(['joinGameChannel'])

})

test('join game', async () => {
  const dispatchMock = jest.fn(store => 1 + 1);

  const store = {
    dispatch: dispatchMock
  }

  const joinGame = {
    player: "Hans",
    gameName: "gameBla1",
    token: "tokenbla3"
  }

  await actions.join(store, joinGame)

  expect(dispatchMock.mock.calls.length).toEqual(4)
  expect(dispatchMock.mock.calls[0]).toEqual(['setPlayer', joinGame.player])
  expect(dispatchMock.mock.calls[1]).toEqual(['setToken', joinGame.token])
  expect(dispatchMock.mock.calls[2]).toEqual(['setGameName', joinGame.gameName])
  expect(dispatchMock.mock.calls[3]).toEqual(['joinGameChannel'])

})
