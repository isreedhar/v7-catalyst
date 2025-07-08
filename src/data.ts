// Mock data for the business management application

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  company: string
  status: 'Active' | 'Inactive' | 'Pending'
  createdDate: string
  address: string
  url: string
}

export interface Task {
  id: number
  title: string
  description: string
  status: 'Open' | 'In Progress' | 'Completed' | 'Cancelled'
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  assignedTo: string
  customerId: number
  customer: Customer
  dueDate: string
  createdDate: string
  url: string
}

export interface Filing {
  id: number
  title: string
  type: 'Tax Return' | 'Legal Document' | 'Compliance' | 'Registration' | 'Other'
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Under Review'
  customerId: number
  customer: Customer
  filingDate: string
  dueDate: string
  url: string
}

export interface Document {
  id: number
  name: string
  type: 'PDF' | 'Word' | 'Excel' | 'Image' | 'Other'
  size: string
  uploadedBy: string
  uploadedDate: string
  customerId?: number
  taskId?: number
  filingId?: number
  customer?: Customer
  task?: Task
  filing?: Filing
  url: string
}

// Customers data
export async function getCustomers(): Promise<Customer[]> {
  return [
    {
      id: 1001,
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corporation',
      status: 'Active',
      createdDate: 'Jan 15, 2024',
      address: '123 Business Ave, New York, NY 10001',
      url: '/customers/1001',
    },
    {
      id: 1002,
      name: 'TechStart Inc',
      email: 'hello@techstart.com',
      phone: '+1 (555) 234-5678',
      company: 'TechStart Inc',
      status: 'Active',
      createdDate: 'Feb 3, 2024',
      address: '456 Innovation Dr, San Francisco, CA 94105',
      url: '/customers/1002',
    },
    {
      id: 1003,
      name: 'Global Solutions Ltd',
      email: 'info@globalsolutions.com',
      phone: '+1 (555) 345-6789',
      company: 'Global Solutions Ltd',
      status: 'Pending',
      createdDate: 'Mar 12, 2024',
      address: '789 Enterprise Blvd, Chicago, IL 60601',
      url: '/customers/1003',
    },
    {
      id: 1004,
      name: 'Creative Agency',
      email: 'team@creativeagency.com',
      phone: '+1 (555) 456-7890',
      company: 'Creative Agency',
      status: 'Active',
      createdDate: 'Apr 8, 2024',
      address: '321 Design St, Los Angeles, CA 90210',
      url: '/customers/1004',
    },
    {
      id: 1005,
      name: 'Manufacturing Co',
      email: 'contact@manufacturing.com',
      phone: '+1 (555) 567-8901',
      company: 'Manufacturing Co',
      status: 'Inactive',
      createdDate: 'May 20, 2024',
      address: '654 Industrial Way, Detroit, MI 48201',
      url: '/customers/1005',
    },
  ]
}

export async function getCustomer(id: string): Promise<Customer | undefined> {
  const customers = await getCustomers()
  return customers.find((customer) => customer.id.toString() === id)
}

// Tasks data
export async function getTasks(): Promise<Task[]> {
  const customers = await getCustomers()
  return [
    {
      id: 2001,
      title: 'Review Q1 Financial Reports',
      description: 'Complete review of quarterly financial statements and prepare summary',
      status: 'In Progress',
      priority: 'High',
      assignedTo: 'John Smith',
      customerId: 1001,
      customer: customers[0],
      dueDate: 'Dec 15, 2024',
      createdDate: 'Dec 1, 2024',
      url: '/tasks/2001',
    },
    {
      id: 2002,
      title: 'Tax Document Preparation',
      description: 'Gather and organize tax documents for annual filing',
      status: 'Open',
      priority: 'Medium',
      assignedTo: 'Sarah Johnson',
      customerId: 1002,
      customer: customers[1],
      dueDate: 'Dec 20, 2024',
      createdDate: 'Dec 2, 2024',
      url: '/tasks/2002',
    },
    {
      id: 2003,
      title: 'Compliance Audit',
      description: 'Conduct annual compliance audit and documentation',
      status: 'Completed',
      priority: 'High',
      assignedTo: 'Mike Davis',
      customerId: 1003,
      customer: customers[2],
      dueDate: 'Nov 30, 2024',
      createdDate: 'Nov 15, 2024',
      url: '/tasks/2003',
    },
    {
      id: 2004,
      title: 'Contract Review',
      description: 'Review and update service contracts',
      status: 'Open',
      priority: 'Low',
      assignedTo: 'Emily Wilson',
      customerId: 1004,
      customer: customers[3],
      dueDate: 'Dec 25, 2024',
      createdDate: 'Dec 3, 2024',
      url: '/tasks/2004',
    },
    {
      id: 2005,
      title: 'System Integration',
      description: 'Integrate new accounting system with existing processes',
      status: 'In Progress',
      priority: 'Urgent',
      assignedTo: 'David Brown',
      customerId: 1001,
      customer: customers[0],
      dueDate: 'Dec 10, 2024',
      createdDate: 'Nov 28, 2024',
      url: '/tasks/2005',
    },
  ]
}

export async function getTask(id: string): Promise<Task | undefined> {
  const tasks = await getTasks()
  return tasks.find((task) => task.id.toString() === id)
}

export async function getCustomerTasks(customerId: string): Promise<Task[]> {
  const tasks = await getTasks()
  return tasks.filter((task) => task.customerId.toString() === customerId)
}

// Filings data
export async function getFilings(): Promise<Filing[]> {
  const customers = await getCustomers()
  return [
    {
      id: 3001,
      title: '2024 Annual Tax Return',
      type: 'Tax Return',
      status: 'Under Review',
      customerId: 1001,
      customer: customers[0],
      filingDate: 'Dec 1, 2024',
      dueDate: 'Dec 31, 2024',
      url: '/filings/3001',
    },
    {
      id: 3002,
      title: 'Business Registration Renewal',
      type: 'Registration',
      status: 'Approved',
      customerId: 1002,
      customer: customers[1],
      filingDate: 'Nov 15, 2024',
      dueDate: 'Dec 15, 2024',
      url: '/filings/3002',
    },
    {
      id: 3003,
      title: 'Compliance Report Q4',
      type: 'Compliance',
      status: 'Submitted',
      customerId: 1003,
      customer: customers[2],
      filingDate: 'Nov 30, 2024',
      dueDate: 'Dec 30, 2024',
      url: '/filings/3003',
    },
    {
      id: 3004,
      title: 'Legal Contract Filing',
      type: 'Legal Document',
      status: 'Draft',
      customerId: 1004,
      customer: customers[3],
      filingDate: 'Dec 5, 2024',
      dueDate: 'Dec 20, 2024',
      url: '/filings/3004',
    },
    {
      id: 3005,
      title: 'Environmental Impact Report',
      type: 'Other',
      status: 'Rejected',
      customerId: 1005,
      customer: customers[4],
      filingDate: 'Nov 20, 2024',
      dueDate: 'Dec 10, 2024',
      url: '/filings/3005',
    },
  ]
}

export async function getFiling(id: string): Promise<Filing | undefined> {
  const filings = await getFilings()
  return filings.find((filing) => filing.id.toString() === id)
}

export async function getCustomerFilings(customerId: string): Promise<Filing[]> {
  const filings = await getFilings()
  return filings.filter((filing) => filing.customerId.toString() === customerId)
}

// Documents data
export async function getDocuments(): Promise<Document[]> {
  const customers = await getCustomers()
  const tasks = await getTasks()
  const filings = await getFilings()
  
  return [
    {
      id: 4001,
      name: 'Financial_Report_Q1_2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'John Smith',
      uploadedDate: 'Dec 1, 2024',
      customerId: 1001,
      customer: customers[0],
      url: '/documents/4001',
    },
    {
      id: 4002,
      name: 'Tax_Documents_2024.xlsx',
      type: 'Excel',
      size: '1.8 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedDate: 'Dec 2, 2024',
      customerId: 1002,
      taskId: 2002,
      customer: customers[1],
      task: tasks[1],
      url: '/documents/4002',
    },
    {
      id: 4003,
      name: 'Compliance_Audit_Report.pdf',
      type: 'PDF',
      size: '3.2 MB',
      uploadedBy: 'Mike Davis',
      uploadedDate: 'Nov 30, 2024',
      customerId: 1003,
      filingId: 3003,
      customer: customers[2],
      filing: filings[2],
      url: '/documents/4003',
    },
    {
      id: 4004,
      name: 'Contract_Template.docx',
      type: 'Word',
      size: '856 KB',
      uploadedBy: 'Emily Wilson',
      uploadedDate: 'Dec 3, 2024',
      customerId: 1004,
      customer: customers[3],
      url: '/documents/4004',
    },
    {
      id: 4005,
      name: 'System_Architecture.png',
      type: 'Image',
      size: '1.2 MB',
      uploadedBy: 'David Brown',
      uploadedDate: 'Nov 28, 2024',
      customerId: 1001,
      taskId: 2005,
      customer: customers[0],
      task: tasks[4],
      url: '/documents/4005',
    },
  ]
}

export async function getDocument(id: string): Promise<Document | undefined> {
  const documents = await getDocuments()
  return documents.find((document) => document.id.toString() === id)
}

export async function getCustomerDocuments(customerId: string): Promise<Document[]> {
  const documents = await getDocuments()
  return documents.filter((document) => document.customerId?.toString() === customerId)
}

export async function getTaskDocuments(taskId: string): Promise<Document[]> {
  const documents = await getDocuments()
  return documents.filter((document) => document.taskId?.toString() === taskId)
}

export async function getFilingDocuments(filingId: string): Promise<Document[]> {
  const documents = await getDocuments()
  return documents.filter((document) => document.filingId?.toString() === filingId)
}

// Recent activity for dashboard
export async function getRecentTasks(): Promise<Task[]> {
  const tasks = await getTasks()
  return tasks.slice(0, 5)
}

export async function getRecentFilings(): Promise<Filing[]> {
  const filings = await getFilings()
  return filings.slice(0, 5)
}

export async function getRecentDocuments(): Promise<Document[]> {
  const documents = await getDocuments()
  return documents.slice(0, 5)
}

// Countries data (keeping for address forms)
export function getCountries() {
  return [
    {
      name: 'Canada',
      code: 'CA',
      flagUrl: '/flags/ca.svg',
      regions: [
        'Alberta',
        'British Columbia',
        'Manitoba',
        'New Brunswick',
        'Newfoundland and Labrador',
        'Northwest Territories',
        'Nova Scotia',
        'Nunavut',
        'Ontario',
        'Prince Edward Island',
        'Quebec',
        'Saskatchewan',
        'Yukon',
      ],
    },
    {
      name: 'Mexico',
      code: 'MX',
      flagUrl: '/flags/mx.svg',
      regions: [
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Ciudad de Mexico',
        'Coahuila',
        'Colima',
        'Durango',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Mexico State',
        'Michoacán',
        'Morelos',
        'Nayarit',
        'Nuevo León',
        'Oaxaca',
        'Puebla',
        'Querétaro',
        'Quintana Roo',
        'San Luis Potosí',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz',
        'Yucatán',
        'Zacatecas',
      ],
    },
    {
      name: 'United States',
      code: 'US',
      flagUrl: '/flags/us.svg',
      regions: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Washington DC',
        'Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'U.S. Virgin Islands',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
        'Armed Forces Americas',
        'Armed Forces Europe',
        'Armed Forces Pacific',
      ],
    },
  ]
}