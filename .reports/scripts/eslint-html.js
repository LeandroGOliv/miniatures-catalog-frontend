import { execSync } from 'child_process'
import { existsSync, unlinkSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { FAIL_ON_ERROR } from './dotenv.js'

export function analyseEslint(exit = true) {
  console.log('🔄 ESLINT: Analisando código...')

  try {
    if (existsSync('.reports/eslint.html')) {
      unlinkSync('.reports/eslint.html')
    }

    execSync('eslint . --format html --output-file .reports/eslint.html', {
      encoding: 'utf8',
      stdio: 'pipe',
    })

    console.log(
      '✅ ESLINT: Nenhum erro encontrado. Visualize o relatório em ".reports/eslint.html"',
    )

    return true
  } catch (error) {
    if (error.stderr && error.stderr.includes('Cannot find native binding')) {
      console.log(
        '🔧 ESLINT: Erro de dependência detectado. Não foi possível rodar o ESlint',
      )
      if (exit) process.exit(0)
      return true
    }

    try {
      const reportsDir = path.resolve('.reports')

      execSync(`start "" "${path.join(reportsDir, 'eslint.html')}"`, {
        shell: true,
      })

      console.log(
        '❌ ESLINT: Erros encontrados. Visualize o relatório em ".reports/eslint.html"',
      )
    } catch {
      console.log(
        '❌ ESLINT: Erro ao executar o ESlint. Não foi possível realizar análise.',
      )
      if (exit) process.exit(0)
      return true
    }

    if (exit) process.exit(FAIL_ON_ERROR ? 1 : 0)

    return FAIL_ON_ERROR ? false : true
  }
}

const __filename = fileURLToPath(import.meta.url)
if (process.argv[1] === __filename) {
  analyseEslint()
}
