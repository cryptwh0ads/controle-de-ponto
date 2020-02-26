export function toSeconds(time_str) {
  if (time_str) {
    // Extract hours, minutes and seconds
    var parts = time_str.split(':')
    // compute  and return total seconds
    return (
      parts[0] * 3600 + // an hour has 3600 seconds
      parts[1] * 60 // seconds
    )
  }
  return 0
}
