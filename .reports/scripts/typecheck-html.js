import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { FAIL_ON_ERROR } from './dotenv.js'

export function analyseTypecheck(exit = true) {
  console.log('🔄 TYPECHECK: Analisando código...')

  try {
    const output = execSync('pnpm typecheck', {
      encoding: 'utf8',
      stdio: 'pipe',
    })

    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Typecheck Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 2rem; }
    pre { background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    .success { color: green; }
    .error { color: red; }
  </style>
</head>
<body>
  <h1>TypeScript Check Results</h1>
  <div class="timestamp">Generated: ${new Date().toLocaleString()}</div>
  <pre>${output.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`

    fs.writeFileSync('.reports/typecheck.html', html)

    console.log(
      '✅ TYPECHECK: Nenhum erro encontrado. Visualize o relatório em ".reports/typecheck.html"',
    )

    return true
  } catch (error) {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Typecheck Report - Errors Found</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 2rem; }
    pre { background: #fff5f5; padding: 1rem; border-radius: 4px; border-left: 4px solid #e53e3e; overflow-x: auto; }
    .error { color: #e53e3e; }
  </style>
</head>
<body>
  <h1 class="error">TypeScript Check - Errors Found</h1>
  <div class="timestamp">Generated: ${new Date().toLocaleString()}</div>
  <pre>${error.stdout.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`

    fs.writeFileSync('.reports/typecheck.html', html)

    console.log(
      '❌ TYPECHECK: Erros encontrados. Visualize o relatório em ".reports/typecheck.html"',
    )

    try {
      const reportsDir = path.resolve('.reports')

      execSync(`start "" "${path.join(reportsDir, 'typecheck.html')}"`, {
        shell: true,
      })
    } catch {}

    if (exit) process.exit(FAIL_ON_ERROR ? 1 : 0)

    return FAIL_ON_ERROR ? false : true
  }
}

const __filename = fileURLToPath(import.meta.url)
if (process.argv[1] === __filename) {
  analyseTypecheck()
}
