import { Stat } from '@/app/stat'
import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getCustomer, getCustomerTasks, getCustomerFilings, getCustomerDocuments } from '@/data'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  let customer = await getCustomer(params.id)

  return {
    title: customer?.name,
  }
}

export default async function Customer({ params }: { params: { id: string } }) {
  let customer = await getCustomer(params.id)
  let tasks = await getCustomerTasks(params.id)
  let filings = await getCustomerFilings(params.id)
  let documents = await getCustomerDocuments(params.id)

  if (!customer) {
    notFound()
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/customers" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Customers
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-20 shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <span className="text-lg font-semibold">{customer.name.charAt(0)}</span>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading>{customer.name}</Heading>
              <Badge color={customer.status === 'Active' ? 'green' : customer.status === 'Pending' ? 'yellow' : 'zinc'}>
                {customer.status}
              </Badge>
            </div>
            <div className="mt-2 text-sm/6 text-zinc-500">
              {customer.email} <span aria-hidden="true">·</span> {customer.phone}
            </div>
            <div className="mt-1 text-sm/6 text-zinc-500">
              {customer.address}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button outline>Edit</Button>
          <Button>Contact</Button>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <Stat title="Active Tasks" value={tasks.filter(t => t.status !== 'Completed').length.toString()} change="+2" />
        <Stat title="Total Filings" value={filings.length.toString()} change="+1" />
        <Stat title="Documents" value={documents.length.toString()} change="+3" />
      </div>
      
      <Subheading className="mt-12">Recent Tasks</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Task</TableHeader>
            <TableHeader>Assigned To</TableHeader>
            <TableHeader>Priority</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Due Date</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} href={task.url} title={`Task: ${task.title}`}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>
                <Badge color={
                  task.priority === 'Urgent' ? 'red' : 
                  task.priority === 'High' ? 'orange' : 
                  task.priority === 'Medium' ? 'yellow' : 'green'
                }>
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge color={
                  task.status === 'Completed' ? 'green' : 
                  task.status === 'In Progress' ? 'blue' : 
                  task.status === 'Cancelled' ? 'red' : 'zinc'
                }>
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell className="text-zinc-500">{task.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Subheading className="mt-12">Recent Filings</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Filing</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Due Date</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {filings.map((filing) => (
            <TableRow key={filing.id} href={filing.url} title={`Filing: ${filing.title}`}>
              <TableCell className="font-medium">{filing.title}</TableCell>
              <TableCell>{filing.type}</TableCell>
              <TableCell>
                <Badge color={
                  filing.status === 'Approved' ? 'green' : 
                  filing.status === 'Submitted' ? 'blue' : 
                  filing.status === 'Under Review' ? 'yellow' :
                  filing.status === 'Rejected' ? 'red' : 'zinc'
                }>
                  {filing.status}
                </Badge>
              </TableCell>
              <TableCell className="text-zinc-500">{filing.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}