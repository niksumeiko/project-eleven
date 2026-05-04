import { TargetsList } from './components/targets-list';

export default function Home() {
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center"
      style={{ background: 'var(--background)' }}
    >
      <main className="flex flex-1 w-full max-w-3xl flex-col py-24 gap-6 px-8 sm:px-16 sm:items-start">
        <div className="flex flex-col gap-1">
          <h1
            className="text-4xl font-bold tracking-widest uppercase flicker"
            style={{
              letterSpacing: '0.2em',
              color: 'var(--foreground)',
              textShadow: '0 0 20px var(--void-border)',
            }}
          >
            Void Session
          </h1>
        </div>

        <div
          className="w-full"
          style={{ borderTop: '1px solid var(--void-border)' }}
        />

        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: 'var(--muted)', letterSpacing: '0.25em' }}
        >
          Targets
        </p>

        <TargetsList />
      </main>
    </div>
  );
}
