import React, { Component } from 'react'
import MdFileDownload from 'react-icons/lib/md/file-download'

class Download extends Component {

    render() {
        const active = this.props.active
        const href = this.props.href

        if (active) {
            return (<a className="btn download active" href={ href } ><MdFileDownload /></a>)
        }
        else {
            return (<a className="btn download" href={ href } ><MdFileDownload /></a>)
        }
    }
}

export default Download
