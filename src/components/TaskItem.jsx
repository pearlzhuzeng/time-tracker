/**
 * @providesModule Task
 * @flow
 */

import React from 'react'
import { values } from 'ramda'

import { formatDuration } from '../helpers/timeFormatters'

import type { StoppedTask } from '../models/Task'
import type { Category } from '../models/Category'

import CategorySelectBox from './CategorySelectBox'
import TimeEditor from './TimeEditor'

type Props = {
  task: StoppedTask,
  categories: {
    [id: string]: Category,
  },
  onChangeDescription: SyntheticInputEvent => void,
  onChangeCategory: string => any,
  onChangeStartTime: moment$Moment => any,
  onChangeStopTime: moment$Moment => any,
  onDelete: () => any,
}

const TaskItem = ({
  task,
  categories,
  onChangeDescription,
  onChangeCategory,
  onChangeStartTime,
  onChangeStopTime,
  onDelete,
}: Props) =>
  <li>
    <input
      type="text"
      value={task.description}
      onChange={onChangeDescription}
    />{' '}
    <p>Duration: {formatDuration(task.getDuration())}</p>
    <CategorySelectBox
      categoryId={task.categoryId}
      categories={categories}
      onChange={onChangeCategory}
    />
    <p>
      <span>
        <TimeEditor time={task.getStartTime()} onChange={onChangeStartTime} />
        –
        <TimeEditor time={task.getStopTime()} onChange={onChangeStopTime} />
      </span>
    </p>
    <button type="submit" onClick={onDelete}>
      Delete item
    </button>
  </li>

export default TaskItem
