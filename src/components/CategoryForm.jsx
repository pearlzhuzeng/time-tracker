/**
 * @providesModule CategoryForm
 * @flow
 */

import React from 'react'
import uuid from 'uuid/v1'

import type { Category } from '../models/Category'

class CategoryForm extends React.Component {
  props: {
    onSubmit: Category => any,
  }
  state = {
    name: '',
    color: '',
  }

  handleChangeName = (e: SyntheticInputEvent) => {
    this.setState({ name: e.target.value })
  }

  handleChangeColor = (e: SyntheticInputEvent) => {
    this.setState({ color: e.target.value })
  }

  handleSubmit = (e: SyntheticEvent) => {
    const id = uuid()
    this.props.onSubmit({ ...this.state, id })
    this.setState({ name: '', color: '' })
  }

  render () {
    return (
      <div>
        <input
          type="text"
          placeholder="add a new category"
          value={this.state.name}
          onChange={this.handleChangeName}
        />
        <input
          type="text"
          placeholder="put in a hex value for the color you want"
          value={this.state.color}
          onChange={this.handleChangeColor}
        />
        <button type="submit" onClick={this.handleSubmit}>
          +
        </button>
      </div>
    )
  }
}

export default CategoryForm
