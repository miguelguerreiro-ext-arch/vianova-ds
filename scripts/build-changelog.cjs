#!/usr/bin/env node
// Regenerates src/changelog-data.js from git log.
// Runs automatically before `npm run build` (via the "prebuild" script).
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const raw = execSync(
  "git log --pretty=format:'<<<%H>>>%n<<<%aI>>>%n<<<%s>>>%n<<<BODY>>>%n%b%n<<<ENDBODY>>>'",
  { encoding: 'utf8' }
)

const entries = []
const re = /<<<([^>]+)>>>\n<<<([^>]+)>>>\n<<<([^>]*)>>>\n<<<BODY>>>\n([\s\S]*?)\n<<<ENDBODY>>>/g
let m
while ((m = re.exec(raw))) {
  const body = m[4]
    .split('\n')
    .filter(l => !/^\s*Co-Authored-By:/i.test(l))
    .join('\n')
    .trim()
  entries.push({ sha: m[1].slice(0, 7), iso: m[2], title: m[3], body })
}

const out = path.join(__dirname, '..', 'src', 'changelog-data.js')
fs.writeFileSync(out, 'export const CHANGELOG = ' + JSON.stringify(entries, null, 2) + '\n')
console.log(`[changelog] wrote ${entries.length} entries to ${path.relative(process.cwd(), out)}`)
