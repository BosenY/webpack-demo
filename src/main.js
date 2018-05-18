export function square(x) {
  if (typeof x !== 'number') {
    throw TypeError('The param should be number!')
  } else {
    return x * x
  }
}
export function cube(x) {
  if (typeof x !== 'number') {
    throw TypeError('The param should be number!')
  } else {
    return x * x * x
  }
}
