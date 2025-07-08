import { getRecentTasks } from '@/data'
import { ApplicationLayout } from './application-layout'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let recentTasks = await getRecentTasks()

  return <ApplicationLayout recentTasks={recentTasks}>{children}</ApplicationLayout>
}