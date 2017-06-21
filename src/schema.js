/**
 * @flow
 */

export type Task = {
  id: string,
  description: string,
  startTime: string,
  stopTime: string,
  duration: string,
}

export type TaskList = {
  [id: string]: Task,
}
