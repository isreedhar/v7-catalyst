import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getDocuments } from '@/data'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documents',
}

export default async function Documents() {
  let documents = await getDocuments()

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Documents</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search documents&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="type">Sort by type</option>
                <option value="date">Sort by date</option>
                <option value="size">Sort by size</option>
              </Select>
            </div>
          </div>
        </div>
        <Button>Upload Document</Button>
      </div>
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Document</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Size</TableHeader>
            <TableHeader>Uploaded By</TableHeader>
            <TableHeader>Upload Date</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id} href={document.url} title={`Document: ${document.name}`}>
              <TableCell className="font-medium">{document.name}</TableCell>
              <TableCell>
                {document.customer ? (
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-100 text-indigo-600">
                      <span className="text-xs font-semibold">{document.customer.name.charAt(0)}</span>
                    </div>
                    <span>{document.customer.name}</span>
                  </div>
                ) : (
                  <span className="text-zinc-500">—</span>
                )}
              </TableCell>
              <TableCell>
                <Badge color={
                  document.type === 'PDF' ? 'red' : 
                  document.type === 'Word' ? 'blue' : 
                  document.type === 'Excel' ? 'green' : 
                  document.type === 'Image' ? 'purple' : 'zinc'
                }>
                  {document.type}
                </Badge>
              </TableCell>
              <TableCell>{document.size}</TableCell>
              <TableCell>{document.uploadedBy}</TableCell>
              <TableCell className="text-zinc-500">{document.uploadedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}