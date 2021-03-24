import actions from '../../src/store/actions'
import initialState from '../../src/store/state'

test('initalize game', async () => {
  const dispatchMock = jest.fn(store => 1 + 1);

  const store = {
    dispatch: dispatchMock
  }

  const initGame = {
    player: 'Hans',
    gameName: 'gameBla1',
    token: 'tokeBla2'
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
    player: 'Hans',
    gameName: 'gameBla1',
    token: 'tokeBla2'
  }

  await actions.join(store, joinGame)

  expect(dispatchMock.mock.calls.length).toEqual(4)
  expect(dispatchMock.mock.calls[0]).toEqual(['setPlayer', joinGame.player])
  expect(dispatchMock.mock.calls[1]).toEqual(['setToken', joinGame.token])
  expect(dispatchMock.mock.calls[2]).toEqual(['setGameName', joinGame.gameName])
  expect(dispatchMock.mock.calls[3]).toEqual(['joinGameChannel'])

})

// test('start game', async () => {
//   const dispatchMock = jest.fn(store => 1 + 1);
//
//   const store = {
//     dispatch: dispatchMock,
//     state: {}
//   }
//
//   await actions.startGame(store)
//
//   expect(dispatchMock.mock.calls.length).toEqual(1)
//   expect(dispatchMock.mock.calls[0]).toEqual(['setGameState', 'chapterTitle'])
//
// })

test('gamover', async () => {
  const dispatchMock = jest.fn(store => 1 + 1);

  const store = {
    dispatch: dispatchMock,
    state: {}
  }

  const summary = {
    over: true
  }

  await actions.summary(store, summary)

  expect(dispatchMock.mock.calls.length).toEqual(1)
  expect(dispatchMock.mock.calls[0]).toEqual(['setGameState', 'gameOver'])

})

test('new chapter', async () => {
  const dispatchMock = jest.fn(store => 1 + 1);

  const store = {
    dispatch: dispatchMock,
    state: {
      gameName: 'Hansli-23',
      chapter: {
        index: 0
      }
    }
  }

  const summary = {
    chapter: {
      title: 'Chapter 1',
      index: 1
    },
    answers: [
      'How many?',
      'Why?'
    ]
  }

  await actions.summary(store, summary)

  expect(dispatchMock.mock.calls.length).toEqual(2)
  expect(dispatchMock.mock.calls[0]).toEqual(['setChapter', summary.chapter])
  expect(dispatchMock.mock.calls[1]).toEqual(['setGameState', 'chapterTitle'])

})

test('show answers', async () => {
  const dispatchMock = jest.fn(store => 1 + 1);

  const store = {
    dispatch: dispatchMock,
    state: {
      chapter: {
        index: 0
      },
      question: {
        index: 0
      }
    }
  }

  const summary = {
    chapter: {
      title: 'Chapter 1',
      index: 0
    },
    question: {
      index: -1,
      text: ''
    },
    answers: [
      {
        text: 'Hello',
        correct: true
      }
    ]
  }

  await actions.summary(store, summary)

  expect(dispatchMock.mock.calls.length).toEqual(1)
  expect(dispatchMock.mock.calls[0]).toEqual(['setGameState', 'showSolution'])

})

test('next question', async () => {
  const dispatchMock = jest.fn(store => 1 + 1);

  const store = {
    dispatch: dispatchMock,
    state: {
      gameState: 'chapterTitle',
      chapter: {
        index: 1
      },
      question: {
        index: 2
      }
    }
  }

  const summary = {
    chapter: {
      title: 'Chapter 1',
      index: 1
    },
    question: {
      index: 0,
      text: 'Hello'
    },
    answers: [
      'Why?',
      'Where',
      'Who?'
    ]
  }

  await actions.summary(store, summary)

  expect(dispatchMock.mock.calls.length).toEqual(3)
  expect(dispatchMock.mock.calls[0]).toEqual(['setQuestion', summary.question])
  expect(dispatchMock.mock.calls[1]).toEqual(['setAnswers', summary.answers])
  expect(dispatchMock.mock.calls[2]).toEqual(['setGameState', 'showQuestion'])

})
