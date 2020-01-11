import dayjs from 'dayjs'

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) => {
  jsonData.map((data: any) => {
    filterKeys.map((key: string) => {
      // time format
      if (key === 'timestamp') {
        return dayjs(data[key]).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return data[key]
      }
    })
  })
}

// Get Round Number
export const getRound = (num: number, len: number): number => {
  return Math.round(num * Math.pow(10, len)) / Math.pow(10, len)
}
