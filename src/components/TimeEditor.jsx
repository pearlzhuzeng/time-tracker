/**
 * @providesModule TimeEditor
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import Moment from 'moment'

class TimeEditor extends React.Component {
  props: {
    time: Moment,
    onChange: Moment => any,
  }

  state = {
    editing: false,
  }

  handleEdit = () => {
    this.setState({ editing: true })
  }

  handleChange = (e: SyntheticInputEvent) => {
    this.props.onChange(Moment(e.target.value))
    this.setState({ editing: false })
  }

  render () {
    return this.state.editing
      ? <span>
        <input
          type="datetime-local"
          defaultValue={this.props.time.format('LTS')}
          onBlur={this.handleChange}
        />
      </span>
      : <ClickableSpan
        role="button"
        tabIndex="0"
        onClick={this.handleEdit}
        onKeyPress={this.handleEdit}
      >
        {this.props.time.format('LTS')}
      </ClickableSpan>
  }
}

export default TimeEditor

const ClickableSpan = styled.span`cursor: pointer;`
