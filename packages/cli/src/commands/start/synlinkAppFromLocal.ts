import fs from 'fs'
import path from 'path'
import colors from 'picocolors'
import { APP_FOLDER, REPO_FOLDER } from '../constants'
import { Props } from './setupApp'
import { forceSymlink } from '../../utils'

function createAppFolder(destinationPath: string) {
  const target = path.resolve(`${destinationPath}/${APP_FOLDER}`)
  fs.mkdirSync(target, { recursive: true })
  return target
}

export default async function synlinkAppFromLocal({
  onError,
  destinationPath,
}: Props) {
  const serverFolderInMonorepo = path.resolve(
    process.cwd(),
    `../../${REPO_FOLDER}`,
  )
  const dataApp = createAppFolder(destinationPath)

  try {
    forceSymlink(serverFolderInMonorepo, dataApp)
    console.log(
      colors.green(
        `✅ Latitup app linked to ${serverFolderInMonorepo} in ${dataApp}`,
      ),
    )
  } catch (err) {
    onError({ error: err as Error, message: `💥 Error linking server folder` })
  }
}
