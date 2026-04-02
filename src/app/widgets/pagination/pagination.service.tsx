const visiblePageItems = (current: number, total: number): (number | 'ellipsis')[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const out: (number | 'ellipsis')[] = []

  const push = (v: number | 'ellipsis') => {
    if (out[out.length - 1] !== v) out.push(v)
  }
  push(1)

  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  if (left > 2) push('ellipsis')
  for (let p = left; p <= right; p++) push(p)
  if (right < total - 1) push('ellipsis')

  push(total)
  return out
}

export default visiblePageItems
