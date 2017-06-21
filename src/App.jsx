/**
 * @providesModule App
 * @flow
 */

import React, { Component } from 'react'
import TaskItem from './components/Task'
import type { Task, TaskList } from './schema'

class App extends React.Component {
  state: Task = {
    description: '',
    startTime: '00:00:00',
    stopTime: '00:00:00',
    duration: '00:00:00',
  }

  handleChangeDescription = (e: SyntheticInputEvent) => {
    this.setState({
      description: e.target.value,
    })
  }

  handleStart = () => {
    this.setState({ startTime: new Date().toLocaleTimeString() })
  }

  handleStop = () => {
    this.setState({
      stopTime: new Date().toLocaleTimeString(),
      duration: this.state.stopTime - this.state.startTime,
    })
  }

  render () {
    return (
      <div>
        <h1>My Time Tracker</h1>
        <input
          type="text"
          placeholder="What are you working on?"
          value={this.state.description}
          onChange={this.handleChangeDescription}
        />
        <button onClick={this.handleStart}>Start</button>
        <button onClick={this.handleStop}>Stop</button>
        <ul>
          <TaskItem />
        </ul>
      </div>
    )
  }
}

export default App
