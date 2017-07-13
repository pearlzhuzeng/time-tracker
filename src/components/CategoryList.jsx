/**
 * @providesModule CategoryList
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { values } from 'ramda'

import type { Category } from '../models/Category'

import CategoryForm from './CategoryForm'

type Props = {
  categories: {
    [id: string]: Category,
  },
  onChangeCategories: ({ [string]: Category }) => any,
}

class CategoryList extends React.Component {
  props: Props

  handleAddCategory = (category: Category) => {
    const { onChangeCategories, categories } = this.props
    onChangeCategories({
      ...categories,
      [category.id]: category,
    })
  }

  render () {
    const { categories } = this.props
    return (
      <Categories>
        <h2>Categories</h2>
        <CategoryForm onSubmit={this.handleAddCategory} />
        <ul>
          {values(categories).map(category =>
            <li key={category.id} style={{ color: category.color }}>
              {category.name}
            </li>
          )}
        </ul>
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
