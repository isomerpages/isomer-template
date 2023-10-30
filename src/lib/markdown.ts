import fs from "fs"
import path from "path"

import rehypeStringify from "rehype-stringify"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

import permalinks from "@/../permalinks.json"

const getFileContents = (filePath: string) => {
  const fullPath = path.join(process.cwd(), filePath)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  return fileContents
}

const getFilePathFromSlug = (slug: string[]) => {
  const filePath =
    permalinks.find(
      (permalink) => JSON.stringify(permalink.slug) === JSON.stringify(slug)
    )?.file || "index.md"

  return filePath
}

export const getPageFrontmatter = async (filePath: string) => {
  const fileContents = getFileContents(filePath)

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .process(fileContents)

  return file.data.matter
}

export const getPage = async (filePath: string) => {
  const fileContents = getFileContents(filePath)

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(fileContents)

  return file.toString()
}

export const getPageFrontmatterFromSlug = async (slug: string[]) => {
  const filePath = getFilePathFromSlug(slug)
  return await getPageFrontmatter(filePath)
}

export const getPageFromSlug = async (slug: string[]) => {
  const filePath = getFilePathFromSlug(slug)
  return await getPage(filePath)
}
