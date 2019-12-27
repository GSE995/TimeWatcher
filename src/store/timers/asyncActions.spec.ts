import configureMockStore from 'redux-mock-store'
import AxiosMockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk'
import axios from 'axios'

import * as asyncAction from './asyncActions'
import * as actions from './actions'

import PageSize from '../../models/PageSize'
import ListResult from '../../models/ListResult'
import { Timer } from '../../models'

import {API_ROOT_URL} from '../../services/TimersService'

const mockStore = configureMockStore([thunk])
const axiosMock = new AxiosMockAdapter(axios)

describe('AsyncActions testing', () => {
    it('Fetch timers success', async () => {
        let pageSize = new PageSize(0, 10)
        let timer = new Timer('')
        timer.endDate = new Date()
        let listResult = new ListResult<Timer>([], 1, pageSize)

        axiosMock.onGet(API_ROOT_URL + 'list').replyOnce(200, listResult)

        const expectedActions = [
            actions.timerRequest(),
            actions.fetchTimers(listResult)
        ]

        const store = mockStore({})

        await store.dispatch(asyncAction.fetchTimers(pageSize))
        return expect(store.getActions()).toEqual(expectedActions)
    })

    it('Change timer', async () => {
        let timer = new Timer('')
        timer.endDate = new Date()
        timer.id = "qwewo3"

        axiosMock.onPut(`${API_ROOT_URL}${timer.id}`).reply(200, timer)

        const expectedActions = [
            actions.timerRequest(),
            actions.changeTimer(timer)
        ]

        const store = mockStore({})

        await store.dispatch(asyncAction.changeTimer(timer))
        return expect(store.getActions()).toEqual(expectedActions)
    })

    it('Remove timer', () => {
        let timer = new Timer()
        timer.endDate = new Date()
        timer.id = "qwewo3"

        axiosMock.onDelete(API_ROOT_URL + timer.id).reply(200, {
            success: true
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

    it('Start timer', async () => {
        let timer = new Timer()
        timer.endDate = null

        axiosMock.onPost(API_ROOT_URL).reply(200, timer)

        const expectedActions = [
            actions.timerRequest(),
            actions.startTimer(timer)
        ]

        const store = mockStore({})
        await store.dispatch(asyncAction.startTimer(timer))
        return expect(store.getActions()).toEqual(expectedActions)
    })

    it('Change active timer', async () => {
        let timer = new Timer('')
        timer.endDate = new Date()

        axiosMock.onPut(API_ROOT_URL + timer.id).reply(200, timer)

        const expectedActions = [
            actions.timerRequest(),
            actions.changeActiveTimer(timer)
        ]

        const store = mockStore({})

        await store.dispatch(asyncAction.changeActiveTimer(timer))
        return expect(store.getActions()).toEqual(expectedActions)
    })
})
