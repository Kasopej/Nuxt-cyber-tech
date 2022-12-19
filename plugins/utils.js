export function getCompoundField(
  obj = {},
  compoundFieldString = '',
  arrayIndexIfNeeded = 0
) {
  let value = obj
  const splitCompoundFields = compoundFieldString.split('.')
  //    e.g split 'details.name' compound field into ['details', 'name']

  splitCompoundFields.forEach((field, index) => {
    value = value?.[field]
    if (Array.isArray(value)) {
      value = value[arrayIndexIfNeeded]
    }
  })
  return value
}
