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
import type { Category } from '../models/Category'

type Props = {
  tasks: {
    [id: string]: Task,
  },
  activeTaskId: string,
  categories: {
    [id: string]: Category,
  },
  onChangeTasks: ({ [string]: Task }) => any,
  onChangeActiveTask: string => any,
}
class TaskLog extends React.Component {
  props: Props

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

  _createChangeCategoryHandler = (taskId: string = this.props.activeTaskId) => (
    categoryId: string
  ) => {
    const { tasks, onChangeTasks } = this.props
    onChangeTasks({
      ...tasks,
      [taskId]: tasks[taskId].setCategory(categoryId),
    })
  }

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
    const { tasks, activeTaskId, categories } = this.props
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
          {/* Choose category of active task?? */}
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
                categories={categories}
                onChangeDescription={this._createChangeDescriptionHandler(
                  task.id
                )}
                onChangeCategory={this._createChangeCategoryHandler(task.id)}
              />
          )}
        </ul>
      </div>
    )
  }
}

export default TaskLog
