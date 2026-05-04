import { TargetsList } from './components/targets-list';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-void">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-24 gap-6 px-8 sm:px-16 sm:items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold tracking-widest uppercase text-foreground text-shadow-void flicker">
            Void Session
          </h1>
        </div>

        <div className="w-full border-t-void" />

        <p className="text-xs uppercase tracking-widest text-muted">
          Targets
        </p>

        <TargetsList />
      </main>
    </div>
  );
}
