import { extend } from '@vue/shared'
import { ConfigEnv, UserConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import {
  parsePagesJsonOnce,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'
import { initFeatures, isSsr, isSsrManifest } from '../utils'

export function createDefine(
  { inputDir, platform }: VitePluginUniResolvedOptions,
  config: UserConfig,
  { command }: ConfigEnv
): UserConfig['define'] {
  return extend(
    { 'process.env.UNI_PLATFORM': JSON.stringify(platform) },
    initFeatures({
      inputDir,
      command,
      platform,
      pagesJson: parsePagesJsonOnce(inputDir, platform),
      manifestJson: parseManifestJsonOnce(inputDir),
      ssr: isSsr(command, config) || isSsrManifest(command, config),
    })
  )
}
