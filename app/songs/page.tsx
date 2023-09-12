// import PocketBase from 'pocketbase';
import image from "next/image";
import Image from "next/image";
import Link from "next/link";
import { MusicalNoteIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Pagination from "../components/Pagination";

// export const dynamic = 'auto',
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = 'auto',
//   runtime = 'nodejs',
//   preferredRegion = 'auto'

async function getNotes() {
  // const db = new PocketBase('http://127.0.0.1:8090');
  // const result = await db.records.getList('notes');
  const res = await fetch(
    // "https://notes-hub.fly.dev/api/collections/songs/records?page=1&perPage=30",
    "https://notes-hub.fly.dev/api/collections/songs/records",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function Events() {
  const notes = await getNotes();

  return (
    <div>
      <h1 className="p-12 text-center">Нека да хвалим Господа... 🎸🎤💜</h1>
      <div>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, author, image, created } = note || {};

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      <li
        key={id}
        className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
      >
        <div className="flex min-w-0 gap-x-4">
          <MusicalNoteIcon className="h-12 w-12 flex-none" />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <Link href={`/songs/${id}`}>
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {title}
              </Link>
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              <a
                href={`mailto:${title}`}
                className="relative truncate hover:underline"
              >
                {title}
              </a>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{author}</p>
            {title ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time dateTime={created}>{created}</time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
            )}
          </div>
          <ChevronRightIcon
            className="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
          />
        </div>
      </li>
    </ul>

  );
}
