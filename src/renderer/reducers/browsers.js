import { combineReducers } from 'redux'

import * as actions from '../../common/actions/browsers.js'

const initialState = {
    browsers: []
}

// reducers

function browsers(state = initialState.browsers, action) {
    switch (action.type) {
        case actions.ADD_BROWSERS:
            return [...state, ...action.browsers]

        case actions.DISABLE_BROWSER: {
            const index = state.findIndex(browser => browser.command === action.browser.command)
            if (index < 0) {
                // couldn't find mapping for given source, no change
                return state
            }
            const browser = state.browsers[index]
            return [
                ...state.slice(0, index),
                Object.assign({}, browser, {
                    status: action.status
                }),
                ...state.slice(index + 1)
            ]
        }

        default:
            return state
    }
}

export default combineReducers({
    browsers
})

// selectors

export function getBrowsers(state) {
    return state.browsers.browsers
}
