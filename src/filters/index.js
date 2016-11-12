import Timeago from 'timeago.js'

const _timeago = new Timeago()

export function timeago (date) {
  return _timeago.format(date)
}
