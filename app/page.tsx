// import PocketBase from 'pocketbase';
import image from "next/image";
import Image from "next/image";
import Link from "next/link";

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
    "https://notes-hub.fly.dev/api/collections/events/records?page=1&perPage=30",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function HomePage() {
  const notes = await getNotes();

  return (
    <div>
      <h1 className="p-12 text-center">Какви събития следват... 🤔</h1>
      <div>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created, start, image } = note || {};

  return (
    <Link href={`/${id}`}>
      <div className="sm:flex p-8">
        <div style={{ position: "relative", width: "150px", height: "100px" }}>
          <Image
            src={`https://notes-hub.fly.dev/api/files/bo9f4kjgkhcv4ch/${id}/${image}`}
            sizes="150px"
            fill
            style={{
              objectFit: "contain",
            }}
            alt={title}
          />
        </div>
        <div className="pl-6">
          <h4 className="text-lg font-bold">{title}</h4>
          <p className="mt-1">{content}</p>
          <p className="mt-1">{created}</p>
        </div>
      </div>
    </Link>
  );
}
