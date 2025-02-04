import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputChanges: 0
        }
    }

    _handleOnChange(event) {
        const { filterRequests } = this.props
        const value = event.target.value

        this.state.inputChanges++
        const inputChanges = this.state.inputChanges

        setTimeout(() => {
            if (inputChanges !== this.state.inputChanges) {
                return
            }
            filterRequests(value)
        }, 300)
    }

    render() {
        return (
            <div className="search">
                <input type="text" placeholder="Search" onChange={this._handleOnChange.bind(this)} />
            </div>
        )
    }
}

Search.propTypes = {
    filterValue: PropTypes.string,
    filterRequests: PropTypes.func.isRequired
}

import { setRequestFilter } from '../../../common/actions/requests.js'
import { getRequestFilter } from '../../reducers/requests.js'

const mapStateToProps = state => ({
    filterValue: getRequestFilter(state) || ''
})

const mapDispatchToProps = {
    filterRequests: setRequestFilter
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)
