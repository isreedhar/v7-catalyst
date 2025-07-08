import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getTask, getTaskDocuments } from '@/data'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let task = await getTask(params.id)

  return {
    title: task && `Task: ${task.title}`,
  }
}

export default async function Task({ params }: { params: { id: string } }) {
  let task = await getTask(params.id)
  let documents = await getTaskDocuments(params.id)

  if (!task) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/tasks" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Tasks
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{task.title}</Heading>
          <Badge color={
            task.status === 'Completed' ? 'green' : 
            task.status === 'In Progress' ? 'blue' : 
            task.status === 'Cancelled' ? 'red' : 'zinc'
          }>
            {task.status}
          </Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <span className="font-medium">Priority:</span>
              <Badge color={
                task.priority === 'Urgent' ? 'red' : 
                task.priority === 'High' ? 'orange' : 
                task.priority === 'Medium' ? 'yellow' : 'green'
              }>
                {task.priority}
              </Badge>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <span className="font-medium">Assigned to:</span>
              <span>{task.assignedTo}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <span className="font-medium">Due:</span>
              <span>{task.dueDate}</span>
            </span>
          </div>
          <div className="flex gap-4">
            <Button outline>Edit Task</Button>
            <Button>Mark Complete</Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Subheading>Task Details</Subheading>
        <Divider className="mt-4" />
        <DescriptionList>
          <DescriptionTerm>Customer</DescriptionTerm>
          <DescriptionDetails>
            <Link href={task.customer.url} className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-100 text-indigo-600">
                <span className="text-xs font-semibold">{task.customer.name.charAt(0)}</span>
              </div>
              <span>{task.customer.name}</span>
            </Link>
          </DescriptionDetails>
          <DescriptionTerm>Description</DescriptionTerm>
          <DescriptionDetails>{task.description}</DescriptionDetails>
          <DescriptionTerm>Status</DescriptionTerm>
          <DescriptionDetails>
            <Badge color={
              task.status === 'Completed' ? 'green' : 
              task.status === 'In Progress' ? 'blue' : 
              task.status === 'Cancelled' ? 'red' : 'zinc'
            }>
              {task.status}
            </Badge>
          </DescriptionDetails>
          <DescriptionTerm>Priority</DescriptionTerm>
          <DescriptionDetails>
            <Badge color={
              task.priority === 'Urgent' ? 'red' : 
              task.priority === 'High' ? 'orange' : 
              task.priority === 'Medium' ? 'yellow' : 'green'
            }>
              {task.priority}
            </Badge>
          </DescriptionDetails>
          <DescriptionTerm>Assigned To</DescriptionTerm>
          <DescriptionDetails>{task.assignedTo}</DescriptionDetails>
          <DescriptionTerm>Created Date</DescriptionTerm>
          <DescriptionDetails>{task.createdDate}</DescriptionDetails>
          <DescriptionTerm>Due Date</DescriptionTerm>
          <DescriptionDetails>{task.dueDate}</DescriptionDetails>
        </DescriptionList>
      </div>
      
      {documents.length > 0 && (
        <div className="mt-12">
          <Subheading>Related Documents</Subheading>
          <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
            <TableHead>
              <TableRow>
                <TableHeader>Document</TableHeader>
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
                  <TableCell>{document.type}</TableCell>
                  <TableCell>{document.size}</TableCell>
                  <TableCell>{document.uploadedBy}</TableCell>
                  <TableCell className="text-zinc-500">{document.uploadedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}