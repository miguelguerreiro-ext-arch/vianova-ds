export default function SectionHeader({ title, description }) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-semibold" style={{ color: 'var(--foreground)' }}>
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
          {description}
        </p>
      )}
      <div className="mt-6 h-px" style={{ backgroundColor: 'var(--border)' }} />
    </div>
  )
}
