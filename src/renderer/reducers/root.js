import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import app from './app.js'
import proxy from './proxy.js'
import requests from './requests.js'
import browsers from './browsers.js'
import urlMappings from './url-mappings.js'

const rootReducer = combineReducers({
    app,
    proxy,
    requests,
    browsers,
    urlMappings,
    routing: routerReducer
})

export default rootReducer
