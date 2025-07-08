import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { getCustomers } from '@/data'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customers',
}

export default async function Customers() {
  let customers = await getCustomers()

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Customers</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search customers&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        <Button>Add Customer</Button>
      </div>
      <ul className="mt-10">
        {customers.map((customer, index) => (
          <li key={customer.id}>
            <Divider soft={index > 0} />
            <div className="flex items-center justify-between">
              <div key={customer.id} className="flex gap-6 py-6">
                <div className="w-16 shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <span className="text-sm font-semibold">{customer.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="text-base/6 font-semibold">
                    <Link href={customer.url}>{customer.name}</Link>
                  </div>
                  <div className="text-xs/6 text-zinc-500">
                    {customer.email} <span aria-hidden="true">·</span> {customer.phone}
                  </div>
                  <div className="text-xs/6 text-zinc-600">
                    {customer.address}
                  </div>
                  <div className="text-xs/6 text-zinc-500">
                    Created: {customer.createdDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="max-sm:hidden" color={customer.status === 'Active' ? 'green' : customer.status === 'Pending' ? 'yellow' : 'zinc'}>
                  {customer.status}
                </Badge>
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={customer.url}>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}