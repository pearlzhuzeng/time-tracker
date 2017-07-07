/**
 * @providesModule App
 * @flow
 */

import React, { Component } from 'react'
import { values } from 'ramda'
import uuid from 'uuid/v1'

import TaskItem from './components/TaskItem'
import ElapsedTime from './components/ElapsedTime'

import Task, { NotStartedTask, StartedTask, StoppedTask } from './models/Task'
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

  handleStart = () => {
    this.setState((state: State) => {
      const activeTask = state.tasks[state.activeTaskId]
      if (!(activeTask instanceof NotStartedTask)) throw new Error()

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [state.activeTaskId]: activeTask.start(),
        },
      }
    })
  }

  handleStop = () => {
    this.setState((state: State) => {
      const activeTask = state.tasks[state.activeTaskId]
      if (!(activeTask instanceof StartedTask)) throw new Error()

      const newTask = new NotStartedTask(uuid())
      return {
        ...state,
        activeTaskId: newTask.id,
        tasks: {
          ...state.tasks,
          [state.activeTaskId]: activeTask.stop(),
          [newTask.id]: newTask,
        },
      }
    })
  }

  // checkStopped: {
  //   return every instanceof StoppedTask
  // }

  componentWillMount () {
    // clearInterval(this.runTime)
  }

  render () {
    const activeTask = this.state.tasks[this.state.activeTaskId]
    return (
      <div>
        <h1>My Time Tracker</h1>
        <p>
          <input
            type="text"
            placeholder="What are you working on?"
            value={activeTask.description}
            onChange={this._createChangeDescriptionHandler()}
          />
          {activeTask instanceof NotStartedTask
            ? <button onClick={this.handleStart}>Start</button>
            : <button onClick={this.handleStop}>Stop</button>}
          {activeTask instanceof StartedTask &&
            <ElapsedTime task={activeTask} />}
        </p>
        <ul>
          {values(this.state.tasks).map(
            (task: Task, id) =>
              task instanceof StoppedTask &&
              <TaskItem
                key={task.id}
                task={task}
                onChangeDescription={this._createChangeDescriptionHandler(
                  task.id
                )}
              />
          )}
        </ul>
      </div>
    )
  }

  _createChangeDescriptionHandler = (
    taskId: string = this.state.activeTaskId
  ) => (e: SyntheticInputEvent) => {
    const { value } = e.target
    this.setState((state: State) => ({
      ...state,
      tasks: {
        ...state.tasks,
        [taskId]: state.tasks[taskId].setDescription(value),
      },
    }))
  }
}

export default App
