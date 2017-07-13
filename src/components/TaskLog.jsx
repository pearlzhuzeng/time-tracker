/**
 * @providesModule TaskLog
 * @flow
 */

import React from 'react'
import { values, omit } from 'ramda'
import uuid from 'uuid/v1'
import styled from 'styled-components'

import TaskItem from './TaskItem'
import ElapsedTime from './ElapsedTime'
import TimeEditor from './TimeEditor'

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

  _createChangeDescriptionHandler = (taskId: string) => (
    e: SyntheticInputEvent
  ) => {
    const { tasks, onChangeTasks } = this.props
    const { value } = e.target
    onChangeTasks({
      ...tasks,
      [taskId]: tasks[taskId].setDescription(value),
    })
  }

  _createChangeCategoryHandler = (taskId: string) => (categoryId: string) => {
    const { tasks, onChangeTasks } = this.props
    onChangeTasks({
      ...tasks,
      [taskId]: tasks[taskId].setCategory(categoryId),
    })
  }

  _createChangeStartTimeHandler = (taskId: string) => (
    startTime: moment$Moment
  ) => {
    const { tasks, onChangeTasks } = this.props
    const task = tasks[taskId]
    if (task instanceof StartedTask || task instanceof StoppedTask) {
      onChangeTasks({
        ...tasks,
        [taskId]: task.setStartTime(startTime),
      })
    }
  }

  _createChangeStopTimeHandler = (taskId: string) => (
    stopTime: moment$Moment
  ) => {
    const { tasks, onChangeTasks } = this.props
    const task = tasks[taskId]
    if (task instanceof StoppedTask) {
      onChangeTasks({
        ...tasks,
        [taskId]: task.setStartTime(stopTime),
      })
    }
  }

  _createDeleteTaskHandler = (taskId: string) => () => {
    const { tasks, onChangeTasks } = this.props
    onChangeTasks(omit([taskId], tasks))
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
      <TaskContainer>
        <p>
          <input
            type="text"
            placeholder="What are you working on?"
            value={activeTask.description}
            onChange={this._createChangeDescriptionHandler(activeTaskId)}
          />
          {/* Choose category of active task?? */}
          {activeTask instanceof NotStartedTask
            ? <button onClick={this.handleStart}>Start</button>
            : <button onClick={this.handleStop}>Stop</button>}
          {activeTask instanceof StartedTask &&
            <ElapsedTime task={activeTask} />}
        </p>
        {activeTask instanceof StartedTask
          ? <TimeEditor
            time={activeTask.getStartTime()}
            onChange={activeTask.onChangeStartTime}
          />
          : <p />}
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
                onChangeStartTime={this._createChangeStartTimeHandler(task.id)}
                onChangeStopTime={this._createChangeStopTimeHandler(task.id)}
                onDelete={this._createDeleteTaskHandler(task.id)}
              />
          )}
        </ul>
      </TaskContainer>
    )
  }
}

export default TaskLog

const TaskContainer = styled.div`width: 20em;`
