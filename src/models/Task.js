/**
 * @flow
 */

import Moment from 'moment'

class Task {
  id: string
  description: string
  _startTime: ?Moment
  _stopTime: ?Moment

  constructor (
    id: string,
    description: string = '',
    startTime: ?Moment = null,
    stopTime: ?Moment = null
  ) {
    this.id = id
    this.description = description
    this._startTime = startTime
    this._stopTime = stopTime
  }

  setDescription (description: string) {
    return new this.constructor(
      this.id,
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
  constructor (id: string, description: string = '') {
    super(id, description)
  }

  start () {
    return new StartedTask(this.id, this.description)
  }
}

/**************/

export class StartedTask extends Task {
  constructor (
    id: string,
    description: string,
    startTime: Moment = new Moment()
  ) {
    super(id, description, startTime)
  }

  getStartTime (): Moment {
    if (this._startTime == null) throw new Error()
    return this._startTime
  }

  getDuration (): moment$MomentDuration {
    return Moment.duration(Moment().diff(this.getStartTime()))
  }

  stop () {
    return new StoppedTask(this.id, this.description, this.getStartTime())
  }
}

/**************/

export class StoppedTask extends Task {
  constructor (
    id: string,
    description: string,
    startTime: Moment,
    stopTime: Moment = new Moment()
  ) {
    super(id, description, startTime, stopTime)
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
