import { build } from 'vite'

const buildRE = /(?:\?|&)build=(?<name>.*?)(?:&|$)/
const queryRE = /[?#].*$/

function cleanUrl(url: string) {
  return url.replace(queryRE, '')
}

async function bundleBuildEntry(config: any, options: any) {
  const viteConfigFile = options.customBuildConfig[options.buildConfig]
  const buildResult = await build({
    configFile: viteConfigFile,
    mode: config.mode,
    build: {
      rollupOptions: {
        input: options.entries
      }
    }
  })

 let outputArr: any[] = [];
 if (Array.isArray(buildResult)) {
  outputArr = buildResult.flatMap(item => item.output?? []);
 } else if ("output" in buildResult && Array.isArray(buildResult.output)) {
  outputArr = buildResult.output
 } else if ("output" in buildResult) {
  outputArr = [buildResult.output]
 }
 const [outputChunk] = outputArr;
  return outputChunk
}

export async function vitePluginBuildEntry(customBuildConfig) {
  let config
  return {
    name: 'vite-plugin-build-entry',
    apply: 'build' as const,
    enforce: 'pre' as const,
    configResolved(resolveConfig) {
      config = resolveConfig
    },
    async load(id) {
      const match = buildRE.exec(id)
      if (!match) {
        return
      }
      const file = cleanUrl(id)
      const outputChunk = await bundleBuildEntry(config, {
        customBuildConfig,
        buildConfig: match.groups!.name,
        entries: [file]
      })

      if (outputChunk.modules) {
        Object.keys(outputChunk.modules).forEach(id => {
          this.addWatchFile(id);
        })
      }

      return `export default ${JSON.stringify(outputChunk.code)}`
    },
  }
}

export default vitePluginBuildEntry
