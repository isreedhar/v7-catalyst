import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getTasks } from '@/data'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tasks',
}

export default async function Tasks() {
  let tasks = await getTasks()

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Tasks</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search tasks&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="title">Sort by title</option>
                <option value="priority">Sort by priority</option>
                <option value="status">Sort by status</option>
                <option value="due_date">Sort by due date</option>
              </Select>
            </div>
          </div>
        </div>
        <Button>Create Task</Button>
      </div>
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Task</TableHeader>
            <TableHeader>Customer</TableHeader>
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
              <TableCell>{task.customer.name}</TableCell>
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
    </>
  )
}