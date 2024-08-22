import path from 'path'
import type { Format, XdwConfigurationRead } from '../config'
import { toArray } from '../utils'
import { resolve } from '../helper/config-resolve'
import { buildDeclaration } from './dts'

export async function buildFile(input: string, config: XdwConfigurationRead) {
  const basename = path.basename(input).replace(/\.ts|\.tsx/, '')
  const dtsFile = `${basename}.d.ts`

  if (config.dts.enable && !config.dts.entry?.length)
    await buildDeclaration(input, path.join(config.outdir, dtsFile))

  if (config.dts.only)
    return

  const formatPromises: Promise<any>[] = []
  for (const format of toArray(config.format) as Format[]) {
    const suffix: Record<string, string> = {
      cjs: 'cjs',
      esm: 'mjs',
      iife: 'iife.js',
    }
    const outfile = path.join(config.outdir, `${basename}.${suffix[format]}`)
    const promise = resolve(config, {
      bundle: true,
      splitting: config.splitting && format === 'esm',
      format: format as any,
      entryPoints: [input],
      outfile,
    })
    if (config.minify && format === 'iife') {
      const promise = resolve(config, {
        bundle: true,
        minify: true,
        entryPoints: [input],
        outfile: outfile.replace('.js', '.min.js'),
      })
      formatPromises.push(promise)
    }
    formatPromises.push(promise)
  }
  await Promise.all(formatPromises)
}
