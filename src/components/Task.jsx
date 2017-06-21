/**
 * @providesModule Task
 * @flow
 */

import React from 'react'
import type { Task } from '../schema'

class TaskItem extends React.Component {
  render () {
    return (
      <li>
        <input type="text" value={this.props.description} />
        <span>Duration: {this.props.duration}</span>
        <span>{this.props.startTime}—{this.props.stopTime}</span>
      </li>
    )
  }
}

export default TaskItem
