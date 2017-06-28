// ✓ ok
const location = env.development ? 'localhost' : 'www.api.com'

// ✓ ok
const location = env.development
  ? 'localhost'
  : 'www.api.com'

// ✗ evite
const location = env.development ?
  'localhost' :
  'www.api.com'