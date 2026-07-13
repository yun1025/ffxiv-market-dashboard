import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/search" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">FFXIV Market</span>
        </Link>
        <span className="text-xs text-gray-400">Global Server (Aether)</span>
      </div>
    </header>
  );
}