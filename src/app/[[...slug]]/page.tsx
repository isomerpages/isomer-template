import type { Metadata } from "next/types"
import permalinks from "@/../permalinks.json"
import {
  getPageFromSlug,
  getPageFrontmatter,
  getPageFrontmatterFromSlug,
} from "@/lib/markdown"

interface DynamicPageProps {
  params: {
    slug: string[]
  }
}

export const generateStaticParams = () => {
  return [...permalinks]
}

export const generateMetadata = async ({
  params,
}: DynamicPageProps): Promise<Metadata> => {
  const title = (
    (await getPageFrontmatterFromSlug(params.slug)) as { title: string }
  ).title

  return {
    title,
  }
}

const Page = async ({ params }: DynamicPageProps) => {
  const contents = await getPageFromSlug(params.slug || [])

  return (
    <div className="content">
      <div dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  )
}

export default Page
