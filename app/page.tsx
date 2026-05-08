'use client'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Void Session</h1>
        <ul>
            <li key={`st-002`}>
              <h2>{`Will Byers`}</h2>
              <p>Signal clarity: {`57%`}</p>
              <p>Duration: {`720s`}</p>
              <p>Last known location: {`Castle Byers`}</p>
              <button type="button">Focus</button>
            </li>
        </ul>
      </main>
    </div>
  );
}
