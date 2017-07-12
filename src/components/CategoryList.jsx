/**
 * @providesModule CategoryList
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { append, remove, update } from 'ramda'

import type { Category } from '../models/Category'

type Props = {
  categories: {
    [id: string]: Category,
  },
  onChangeCategories: ({ [string]: Category }) => any,
}

class CategoryList extends React.Component {
  props: Props

  state: Category = {
    id: '',
    name: '',
    color: 'Green',
  }

  handleChangeName = (e: SyntheticInputEvent) => {
    this.setState({ name: e.target.value })
  }

  handleChangeColor = (e: SyntheticInputEvent) => {
    this.setState({ name: e.target.value })
  }

  render () {
    return (
      <Categories>
        <h2>Categories</h2>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit">+</button>
        </form>
      </Categories>
    )
  }
}

export default CategoryList

const Categories = styled.div`
  margin-left: 3em;
  border: solid 1px LightGrey;
  padding: 1em;
`
