import { analyseEslint } from './eslint-html.js'
import { analyseTypecheck } from './typecheck-html.js'

let eslintHasErrors = analyseEslint(false)
let typecheckHasErrors = analyseTypecheck(false)

if (!eslintHasErrors || !typecheckHasErrors) {
  process.exit(1)
}
