const status = s => {
  // 1xx
  if(s === 100) return '🏁'
  if(s === 101) return '🔀'
  if(s === 102) return '🏳'
  if(s < 200) return 'ℹ️'

  // 2xx
  if(s === 200) return '✅'
  if(s === 201) return '📝'
  if(s === 202) return '🔄'
  if(s === 203) return '📝'
  if(s === 204) return '💭'
  if(s === 205) return '🗑'
  if(s === 206) return '⚗'
  if(s === 207) return '🔣'
  if(s < 300) return '🆗'

  // 3xx
  if(s === 300) return '🗳'
  if(s === 301) return '🚚'
  if(s === 302) return '🔎'
  if(s === 303) return '↪️'
  if(s === 304) return '⚖'
  if(s === 308) return '🚚'
  if(s < 400) return '🌀'

  // 4xx
  if(s === 400) return '🚫'
  if(s === 401) return '⛔'
  if(s === 402) return '💰'
  if(s === 403) return '🔐'
  if(s === 404) return '🕸'
  if(s === 405) return '🖍'
  if(s === 406) return '🌫'
  if(s === 407) return '🛂'
  if(s === 408) return '⏰'
  if(s === 409) return '💥'
  if(s === 410) return '💨'
  if(s === 411) return '📏'
  if(s === 413) return '🍔'
  if(s === 414) return '📏'
  if(s === 415) return '📼'
  if(s === 418) return '☕️'
  if(s === 422) return '🌫'
  if(s === 423) return '🔒'
  if(s === 424) return '🛅'
  if(s === 426) return '⬆️'
  if(s === 429) return '🏎'
  if(s === 451) return '🔏'
  if(s < 500) return '🚩'

  // 5xx
  if(s === 500) return '⚠️'
  if(s === 501) return '📠'
  if(s === 502) return '🚧'
  if(s === 503) return '⏳'
  if(s === 504) return '⏲'
  if(s === 505) return '📀'
  if(s === 507) return '🗄'
  if(s === 508) return '🔁'

  return '💣'
}


const method = m => {
  if(m === 'GET') return '⛽️'
  if(m === 'HEAD') return '👨🏽'
  if(m === 'POST') return '📮'
  if(m === 'PUT') return '📥'
  if(m === 'DELETE') return '🗑'
  if(m === 'TRACE') return '🔎'
  if(m === 'OPTIONS') return '⚙'
  if(m === 'CONNECT') return '🔀'
  if(m === 'PATCH') return '📝'
  return '😜'
}

const secure = s => (s ? '🔐' : '🔓')

module.exports = {method, status, secure}
