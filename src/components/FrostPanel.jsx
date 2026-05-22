export default function FrostPanel({ className = '', children, ...rest }) {
  return (
    <div className={`rounded-2xl border border-white/10 ${className}`}
      style={{ background: 'rgba(40,24,14,0.34)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }} {...rest}>
      {children}
    </div>
  )
}
