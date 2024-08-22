import path from 'path'
import merge from 'lodash/merge'
import slash from 'slash'
import { loadConfig } from 'unconfig'
import type { XdwConfigurationRead } from '../config'

export async function helperConfigRead(config: XdwConfigurationRead) {
  const { config: mrConfig } = await loadConfig<XdwConfigurationRead>({
    sources: {
      files: 'xdw.config',
      extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
    },
    merge: false,
  })

  if (mrConfig)
    merge(config, mrConfig)

  if (config.root)
    config.entry = config.entry.map((p: string) => path.join(config.root, p))

  if (!config.format)
    config.format = config.platform === 'node' ? ['cjs', 'esm'] : ['cjs', 'esm', 'iife']

  config.entry = config.entry.map(slash)
  config.outdir = slash(config.outdir)
  return config
}
