import { Stat } from '@/app/stat'
import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentTasks, getRecentFilings, getRecentDocuments } from '@/data'

export default async function Dashboard() {
  let recentTasks = await getRecentTasks()
  let recentFilings = await getRecentFilings()
  let recentDocuments = await getRecentDocuments()

  return (
    <>
      <Heading>Good afternoon, Admin</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Customers" value="127" change="+12%" />
        <Stat title="Active Tasks" value="43" change="+8%" />
        <Stat title="Pending Filings" value="18" change="-2%" />
        <Stat title="Documents Uploaded" value="1,247" change="+15%" />
      </div>
      
      <Subheading className="mt-14">Recent Tasks</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
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
          {recentTasks.map((task) => (
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

      <Subheading className="mt-14">Recent Filings</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Filing</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Due Date</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentFilings.map((filing) => (
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
              <TableCell className="text-zinc-500">{filing.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}