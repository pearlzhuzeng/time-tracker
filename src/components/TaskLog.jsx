/**
 * @providesModule TaskLog
 * @flow
 */

import React from 'react'
import { values } from 'ramda'
import uuid from 'uuid/v1'

import TaskItem from '../components/TaskItem'
import ElapsedTime from '../components/ElapsedTime'

import Task, { NotStartedTask, StartedTask, StoppedTask } from '../models/Task'

type Props = {
  tasks: {
    [id: string]: Task,
  },
  activeTaskId: string,
  onChangeTasks: ({ [string]: Task }) => any,
  onChangeActiveTask: string => any,
}
class TaskLog extends React.Component {
  props: Props

  handleStart = () => {
    const { tasks, activeTaskId, onChangeTasks } = this.props
    const activeTask = tasks[activeTaskId]
    if (!(activeTask instanceof NotStartedTask)) throw new Error()

    onChangeTasks({
      ...tasks,
      [activeTaskId]: activeTask.start(),
    })
  }

  handleStop = () => {
    const {
      tasks,
      activeTaskId,
      onChangeTasks,
      onChangeActiveTask,
    } = this.props

    const activeTask = tasks[activeTaskId]
    if (!(activeTask instanceof StartedTask)) throw new Error()

    const newTask = new NotStartedTask(uuid())
    onChangeTasks({
      ...tasks,
      [activeTaskId]: activeTask.stop(),
      [newTask.id]: newTask,
    })
    onChangeActiveTask(newTask.id)
  }

  render () {
    const { tasks, activeTaskId } = this.props
    const activeTask = tasks[activeTaskId]

    return (
      <div>
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
          {values(tasks).map(
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
    taskId: string = this.props.activeTaskId
  ) => (e: SyntheticInputEvent) => {
    const { tasks, onChangeTasks } = this.props
    const { value } = e.target
    onChangeTasks({
      ...tasks,
      [taskId]: tasks[taskId].setDescription(value),
    })
  }
}

export default TaskLog
