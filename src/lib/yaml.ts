import fs from "fs"
import path from "path"
import YAML from "yaml"

interface ConfigYaml {
  title: string
  description: string
}

export const getConfig = (): ConfigYaml => {
  const fullPath = path.join(process.cwd(), "config.yml")
  const content = fs.readFileSync(fullPath, "utf8")

  return YAML.parse(content)
}
