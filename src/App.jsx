/**
 * @providesModule App
 * @flow
 */

import React, { Component } from 'react'
import uuid from 'uuid/v1'
import styled from 'styled-components'

import TaskLog from './components/TaskLog'
import CategoryList from './components/CategoryList'

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

  handleChangeCategories = (categories: { [string]: Category }) => {
    this.setState((state: State) => {
      return {
        ...state,
        categories,
      }
    })
  }

  render () {
    const { categories, tasks, activeTaskId } = this.state
    return (
      <div>
        <h1>My Time Tracker</h1>
        <Container>
          <TaskLog
            tasks={tasks}
            categories={categories}
            activeTaskId={activeTaskId}
            onChangeTasks={this.handleChangeTasks}
            onChangeActiveTask={this.handleChangeActiveTask}
          />
          <CategoryList
            categories={categories}
            onChangeCategories={this.handleChangeCategories}
          />
        </Container>
      </div>
    )
  }
}

export default App

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 1em;
  max-width: 50em;
`
