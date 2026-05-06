import dotenv from 'dotenv'

dotenv.config({ quiet: true })

export const FAIL_ON_ERROR = !['0', 'false'].includes(
  (process.env.LINT_FAIL_ON_ERRORS || '1').toLowerCase(),
)
