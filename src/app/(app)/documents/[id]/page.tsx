import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { getDocument } from '@/data'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let document = await getDocument(params.id)

  return {
    title: document && `Document: ${document.name}`,
  }
}

export default async function Document({ params }: { params: { id: string } }) {
  let document = await getDocument(params.id)

  if (!document) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/documents" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Documents
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{document.name}</Heading>
          <Badge color={
            document.type === 'PDF' ? 'red' : 
            document.type === 'Word' ? 'blue' : 
            document.type === 'Excel' ? 'green' : 
            document.type === 'Image' ? 'purple' : 'zinc'
          }>
            {document.type}
          </Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <span className="font-medium">Size:</span>
              <span>{document.size}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <span className="font-medium">Uploaded by:</span>
              <span>{document.uploadedBy}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <span className="font-medium">Upload date:</span>
              <span>{document.uploadedDate}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <Button outline>Edit</Button>
            <Button>Download</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Document Details</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Name</DescriptionTerm>
          <DescriptionDetails>{document.name}</DescriptionDetails>
          <DescriptionTerm>Type</DescriptionTerm>
          <DescriptionDetails>
            <Badge color={
              document.type === 'PDF' ? 'red' : 
              document.type === 'Word' ? 'blue' : 
              document.type === 'Excel' ? 'green' : 
              document.type === 'Image' ? 'purple' : 'zinc'
            }>
              {document.type}
            </Badge>
          </DescriptionDetails>
          <DescriptionTerm>Size</DescriptionTerm>
          <DescriptionDetails>{document.size}</DescriptionDetails>
          <DescriptionTerm>Uploaded By</DescriptionTerm>
          <DescriptionDetails>{document.uploadedBy}</DescriptionDetails>
          <DescriptionTerm>Upload Date</DescriptionTerm>
          <DescriptionDetails>{document.uploadedDate}</DescriptionDetails>
          {document.customer && (
            <>
              <DescriptionTerm>Customer</DescriptionTerm>
              <DescriptionDetails>
                <Link href={document.customer.url} className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-100 text-indigo-600">
                    <span className="text-xs font-semibold">{document.customer.name.charAt(0)}</span>
                  </div>
                  <span>{document.customer.name}</span>
                </Link>
              </DescriptionDetails>
            </>
          )}
          {document.task && (
            <>
              <DescriptionTerm>Related Task</DescriptionTerm>
              <DescriptionDetails>
                <Link href={document.task.url}>{document.task.title}</Link>
              </DescriptionDetails>
            </>
          )}
          {document.filing && (
            <>
              <DescriptionTerm>Related Filing</DescriptionTerm>
              <DescriptionDetails>
                <Link href={document.filing.url}>{document.filing.title}</Link>
              </DescriptionDetails>
            </>
          )}
        </DescriptionList>
      </div>
    </>
  )
}