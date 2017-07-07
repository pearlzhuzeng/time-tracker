/**
 * @flow
 */

// Pad a time segment with zeros. Only valid for 0 <= x < 60
function timeSegment (number: number): string {
  if (number < 10) return `0${number}`
  return `${number}`
}

export function formatDuration (duration: moment$MomentDuration): string {
  const hours = duration.hours()
  const minutes = timeSegment(duration.minutes())
  const seconds = timeSegment(duration.seconds())
  return `${hours}:${minutes}:${seconds}`
}
