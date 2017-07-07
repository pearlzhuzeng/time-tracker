/**
 * @flow
 */

import Moment from 'moment'

class Task {
  id: string
  categoryId: string
  description: string
  _startTime: ?Moment
  _stopTime: ?Moment

  constructor (
    id: string,
    categoryId: string = '',
    description: string = '',
    startTime: ?Moment = null,
    stopTime: ?Moment = null
  ) {
    this.id = id
    this.categoryId = categoryId
    this.description = description
    this._startTime = startTime
    this._stopTime = stopTime
  }

  setCategory (categoryId: string) {
    return new this.constructor(
      this.id,
      categoryId,
      this.description,
      this._startTime,
      this._stopTime
    )
  }

  setDescription (description: string) {
    return new this.constructor(
      this.id,
      this.categoryId,
      description,
      this._startTime,
      this._stopTime
    )
  }
}
export default Task

/**************
 * Subclasses *
 **************/

export class NotStartedTask extends Task {
  constructor (id: string, categoryId: string = '', description: string = '') {
    super(id, categoryId, description)
  }

  start () {
    return new StartedTask(this.id, this.categoryId, this.description)
  }
}

/**************/

export class StartedTask extends Task {
  constructor (
    id: string,
    categoryId: string,
    description: string,
    startTime: Moment = new Moment()
  ) {
    super(id, categoryId, description, startTime)
  }

  getStartTime (): Moment {
    if (this._startTime == null) throw new Error()
    return this._startTime
  }

  getDuration (): moment$MomentDuration {
    return Moment.duration(Moment().diff(this.getStartTime()))
  }

  stop () {
    return new StoppedTask(
      this.id,
      this.categoryId,
      this.description,
      this.getStartTime()
    )
  }
}

/**************/

export class StoppedTask extends Task {
  constructor (
    id: string,
    categoryId: string,
    description: string,
    startTime: Moment,
    stopTime: Moment = new Moment()
  ) {
    super(id, categoryId, description, startTime, stopTime)
  }

  getStartTime (): Moment {
    if (this._startTime == null) throw new Error()
    return this._startTime
  }

  getStopTime (): Moment {
    if (this._stopTime == null) throw new Error()
    return this._stopTime
  }

  getDuration (): moment$MomentDuration {
    return Moment.duration(this.getStopTime().diff(this.getStartTime()))
  }
}
