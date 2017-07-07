/**
 * @providesModule Task
 * @flow
 */

import React from 'react'
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
    />
    <p>Duration: {task.getDuration().toISOString()}</p>
    <p>
      <span>
        {task.getStartTime().toISOString()}
        —
        {task.getStopTime().toISOString()}
      </span>
    </p>
  </li>

export default TaskItem
