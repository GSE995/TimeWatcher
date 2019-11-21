import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {API_ROOT_URL} from '../../services/TimersService'

import { Timer } from '../../models'

import * as asyncAction from './asyncActions'
import * as actions from './actions'
import * as t from './actionTypes'
import PageSize from '../../models/PageSize'

const mockStore = configureMockStore([thunk])

describe('AsyncActions testing', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('Fetch timers', () => {
        let timer = new Timer('')

        fetchMock.getOnce(`${API_ROOT_URL}/list`, {
            headers: {'content-type': 'application/json'},
            body: { data: [timer], success: true}
        })

        const expectedActions = [
            actions.timerRequest(),
            actions.fetchTimers([timer])
        ]

        const store = mockStore({})

        return store.dispatch(asyncAction.fetchTimers(new PageSize(0, 10))).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Change timer', () => {
        let timer = new Timer('')

        fetchMock.putOnce(`${API_ROOT_URL}`, {
            headers: {'content-type': 'application/json'},
            body: { data: timer, success: true}
        })

        const expectedActions = [
            actions.timerRequest(),
            actions.changeTimer(timer)
        ]

        const store = mockStore({})

        return store.dispatch(asyncAction.changeTimer(timer)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Remove timer', () => {
        let timer = new Timer('')
        timer.id = 1

        fetchMock.deleteOnce(`${API_ROOT_URL}/${timer.id}`, {
            headers: {'content-type': 'application/json'},
            body: { success: true }
        })

        const expectedActions = [
            actions.timerRequest(),
            actions.removeTimer(timer.id)
        ]

        const store = mockStore({})

        return store.dispatch(asyncAction.removeTimer(timer)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Start timer', () => {
        let timer = new Timer('')

        fetchMock.postOnce(`${API_ROOT_URL}`, {
            headers: {'content-type': 'application/json'},
            body: { data: timer, success: true}
        })

        const expectedActions = [
            actions.timerRequest(),
            actions.changeActiveTimer(timer)
        ]

        const store = mockStore({})

        return store.dispatch(asyncAction.startTimer(timer)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Change active timer', () => {
        let timer = new Timer('')

        fetchMock.putOnce(`${API_ROOT_URL}`, {
            headers: {'content-type': 'application/json'},
            body: { data: timer, success: true}
        })

        const expectedActions = [
            actions.timerRequest(),
            actions.changeActiveTimer(timer)
        ]

        const store = mockStore({})

        return store.dispatch(asyncAction.changeActiveTimer(timer)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
