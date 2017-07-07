/**
 * @providesModule ElapsedTime
 * @flow
 */

import React from 'react'

import type { StartedTask } from '../models/Task'

class ElapsedTime extends React.Component {
  props: { task: StartedTask }

  _rerenderInterval: number

  componentDidMount () {
    this._rerenderInterval = setInterval(() => this.forceUpdate(), 100)
  }

  componentWillUnmount () {
    clearInterval(this._rerenderInterval)
  }

  render () {
    return (
      <span>
        {this.props.task.getDuration().toISOString()}
      </span>
    )
  }
}

export default ElapsedTime
