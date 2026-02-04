export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-primary)' }}>
      <div className="flex w-full items-center justify-between px-6 py-4 text-xs" style={{ color: 'var(--text-muted)' }}>
        <span>JSONFLOW</span>
        <a
          className="hover:underline"
          style={{ color: 'var(--text-secondary)' }}
          href="https://www.npmjs.com/package/@andro.dev/jsonflow-engine"
          target="_blank"
          rel="noreferrer"
        >
          Powered by @andro.dev/jsonflow-engine
        </a>
      </div>
    </footer>
  );
}
