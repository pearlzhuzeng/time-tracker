/**
 * @providesModule App
 * @flow
 */

import React, { Component } from 'react'
import uuid from 'uuid/v1'

import TaskLog from './components/TaskLog'

import Task, { NotStartedTask } from './models/Task'
import type { Category } from './models/Category'

type State = {
  activeTaskId: string, // key in tasks

  // “Database”
  categories: {
    [id: string]: Category,
  },
  tasks: {
    [id: string]: Task,
  },
}

class App extends Component {
  state: State

  constructor (props: {}) {
    super(props)

    const active = new NotStartedTask(uuid())
    this.state = {
      activeTaskId: active.id,
      categories: {},
      tasks: {
        [active.id]: active,
      },
    }
  }

  handleChangeTasks = (tasks: { [string]: Task }) => {
    this.setState((state: State) => {
      return {
        ...state,
        tasks,
      }
    })
  }

  handleChangeActiveTask = (activeTaskId: string) => {
    this.setState((state: State) => {
      return {
        ...state,
        activeTaskId,
      }
    })
  }

  render () {
    return (
      <div>
        <h1>My Time Tracker</h1>
        <div>
          <TaskLog
            tasks={this.state.tasks}
            activeTaskId={this.state.activeTaskId}
            onChangeTasks={this.handleChangeTasks}
            onChangeActiveTask={this.handleChangeActiveTask}
          />
          <div />
        </div>
      </div>
    )
  }
}

export default App
