import colors from 'picocolors'
import fs from 'fs'
import path from 'path'
import { APP_FOLDER } from '../constants'
import watcher from './common/watcher'
import output from './common/output'

const INTERNAL_QUERIES_FOLDER = path.join(
  process.cwd(),
  APP_FOLDER,
  'static',
  'latitude',
  'queries',
)

export default async function watchQueries(dir: string) {
  clearInternalQueriesFolder()

  const syncFile = (
    srcPath: string,
    type: 'add' | 'change' | 'unlink',
    ready: boolean,
  ) => {
    const relativePath = path.relative(dir, srcPath)
    const destPath = path.join(INTERNAL_QUERIES_FOLDER, relativePath)

    if (type === 'add' || type === 'change') {
      // Make sure all directories in the path exist
      fs.mkdirSync(path.dirname(destPath), { recursive: true })

      fs.copyFile(srcPath, destPath, (err) => {
        if (err) {
          return output(
            colors.red(
              `${relativePath} could not be copied to ${destPath}: ${err}`,
            ),
            ready,
          )
        } else {
          output(colors.gray(`${relativePath} synced`), ready)
        }
      })
    } else if (type === 'unlink') {
      fs.unlink(destPath, (err) => {
        if (err) {
          output(colors.red(`${destPath} could not be deleted: ${err}`), ready)
        }
      })
    }
  }

  await watcher(dir, syncFile, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    persistent: true,
  })

  process.on('exit', () => {
    clearInternalQueriesFolder()
  })
}

/**
 * Clears the internal queries folder by deleting all files and subfolders.
 */
function clearInternalQueriesFolder() {
  if (!fs.existsSync(INTERNAL_QUERIES_FOLDER)) {
    fs.mkdirSync(INTERNAL_QUERIES_FOLDER, { recursive: true })
  }

  fs.readdirSync(INTERNAL_QUERIES_FOLDER).forEach((file: string) => {
    const filePath = path.join(INTERNAL_QUERIES_FOLDER, file)
    if (fs.statSync(filePath).isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true })
    } else {
      fs.unlinkSync(filePath)
    }
  })
}
