export const convertUnixToUTC = (unixTimestamp: bigint): string => {
  // Create a new Date object using the UNIX timestamp
  // The BigInt needs to be converted to a number, and multiplied by 1000 to convert seconds to milliseconds
  const date = new Date(Number(unixTimestamp) * 1000)

  // Get the month, day, and year from the date object
  const month = date.getUTCMonth() + 1 // getUTCMonth() returns months from 0-11
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()

  // Format the date as mm/dd/yy
  const formattedDate = `${pad(month)}/${pad(day)}/${year}`

  return formattedDate
}

// Helper function to ensure single digit numbers are padded with a zero
function pad(num: number): string {
  return num < 10 ? `0${num}` : num.toString()
}
