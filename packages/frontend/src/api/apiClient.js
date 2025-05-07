async function request(url, options) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const text = await res.text()
    const err = new Error(`API Error: ${res.status} ${res.statusText} - ${text}`)
    err.status = res.status
    throw err
  }

  return res.json()
}

export default request
