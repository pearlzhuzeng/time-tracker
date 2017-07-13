/**
 * @providesModule CatetorySelectBox
 * @flow
 */

import React from 'react'
import { values } from 'ramda'
import type { Category } from '../models/Category'

type Props = {
  categoryId: string,
  categories: {
    [id: string]: Category,
  },
  onChange: string => any,
}

const CategorySelectBox = ({ categories, categoryId, onChange }: Props) =>
  <select
    value={categoryId}
    onChange={(e: SyntheticInputEvent) => onChange(e.target.value)}
  >
    <option value={null}>No category</option>
    {values(categories).map(category =>
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    )}
  </select>

export default CategorySelectBox
