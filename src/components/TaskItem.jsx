/**
 * @providesModule Task
 * @flow
 */

import React from 'react'

import { formatDuration } from '../helpers/timeFormatters'
import type { StoppedTask } from '../models/Task'

type Props = {
  task: StoppedTask,
  onChangeDescription: SyntheticInputEvent => void,
}

const TaskItem = ({ task, onChangeDescription }: Props) =>
  <li>
    <input
      type="text"
      value={task.description}
      onChange={onChangeDescription}
    />{' '}
    <p>Duration: {formatDuration(task.getDuration())}</p>
    <p>
      <span>
        {task.getStartTime().format('LTS')}
        –
        {task.getStopTime().format('LTS')}
      </span>
    </p>
  </li>

export default TaskItem
