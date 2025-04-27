export default function DashboardShell({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`grid items-center gap-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
