export function objectToOptions(arr: [], valueName: string, labelName: string) {
  const options: any[] = []
  arr.forEach((item: any) => {
    options.push({
      value: item[valueName],
      label: item[labelName]
    })
  })
  return options
}
