import React from 'react'
import PropTypes from 'prop-types'

const RequestLabels = props => {
    const { request, labels } = props

    const url = request.fullUrl
    const labelNodes = []

    if (request.isMappedUrl) {
        const activeClass = request.isMappingActive ? 'mapped' : 'mapped-inactive'

        labelNodes.push(
            <span className={`label ${activeClass}`} key="mapped" title={request.newUrl}>
                <i className="fa fa-warning" />
                mapped
            </span>
        )
    }

    labels.forEach(function(label, index) {
        if (!label.regex.test(url)) {
            return
        }

        labelNodes.push(
            <span className={`label ${label.className}`} key={index}>
                {label.name}
            </span>
        )
    })

    return <div className="labels">{labelNodes}</div>
}

RequestLabels.propTypes = {
    request: PropTypes.object.isRequired,
    labels: PropTypes.array.isRequired
}

export default RequestLabels
