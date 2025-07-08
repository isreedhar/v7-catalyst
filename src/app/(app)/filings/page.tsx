import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getFilings } from '@/data'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Filings',
}

export default async function Filings() {
  let filings = await getFilings()

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Filings</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search filings&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="title">Sort by title</option>
                <option value="type">Sort by type</option>
                <option value="status">Sort by status</option>
                <option value="due_date">Sort by due date</option>
              </Select>
            </div>
          </div>
        </div>
        <Button>Create Filing</Button>
      </div>
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Filing</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Filing Date</TableHeader>
            <TableHeader>Due Date</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {filings.map((filing) => (
            <TableRow key={filing.id} href={filing.url} title={`Filing: ${filing.title}`}>
              <TableCell className="font-medium">{filing.title}</TableCell>
              <TableCell>{filing.customer.name}</TableCell>
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
              <TableCell className="text-zinc-500">{filing.filingDate}</TableCell>
              <TableCell className="text-zinc-500">{filing.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}