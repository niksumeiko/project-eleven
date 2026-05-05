import VoidSession from '@/components/void-session';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full  flex-col items-center justify-between py-32 px-16">
        <VoidSession />
      </main>
    </div>
  );
}
