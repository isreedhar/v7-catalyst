export function Logo({ className, ...props }: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div className={className} {...props}>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <span className="text-sm font-bold text-white">BM</span>
        </div>
        <span className="text-lg font-semibold">Business Manager</span>
      </div>
    </div>
  )
}