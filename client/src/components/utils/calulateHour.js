/* eslint-disable no-redeclare */
import { toSeconds } from './toSeconds'

let arr = []

export async function calcHr(e1, s1, e2, s2, op) {
  // Verify the option to calculate in the correct order
  if (op === 'entrance') {
    var difference = Math.abs(toSeconds(e1) - toSeconds(e1))
  } else if (op === 'b_lunch') {
    var difference = Math.abs(toSeconds(s1) - toSeconds(e1))
  } else if (op === 'a_lunch') {
    var difference = Math.abs(toSeconds(s1) - toSeconds(e1))
  } else if (op === 'exit') {
    var difference = Math.abs(
      toSeconds(s1) - toSeconds(e1) + (toSeconds(s2) - toSeconds(e2))
    )
  } else if (op === 'miss') {
    var difference =
      Math.abs(toSeconds(s1)) <= 32400
        ? Math.abs(toSeconds(s1) - toSeconds(e1))
        : 0
  } else if (op === 'extra') {
    var difference =
      Math.abs(toSeconds(s1)) >= 32400
        ? Math.abs(toSeconds(s1) - toSeconds(e1))
        : 0
  }
  // format time difference
  var result = [
    Math.floor(difference / 3600), // an hour has 3600 seconds
    Math.floor((difference % 3600) / 60), // a minute has 60 seconds
    difference % 60
  ]
  // 0 padding and concatenation
  result = result
    .map(function(v) {
      return v < 10 ? '0' + v : v
    })
    .join(':')
  arr.push(result)

  return result
}
