
import {
  StarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { pb } from "@/lib/pb";


async function getNote(noteId: string) {
  const res = await fetch(
    `https://notes-hub.fly.dev/api/collections/songs/records/${noteId}`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const song_id = params.id;

  const song_details = await pb.collection("songs").getOne(song_id);

  const song = await getNote(params.id);

  let jsx: any;

  const xml: string = song_details.verses;

  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {song.title}
            </h1>
          </div>
          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{song.content}</p>
            </div>
            <div className="mt-6 flex items-center">
              {/* <UserIcon
                className="h-5 w-5 flex-shrink-0 text-blue-500"
                aria-hidden="true"
              /> */}
              <p className="ml-2 text-sm text-gray-500">{song.author}</p>
            </div>
            {/* Product image */}
            {/* <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                <Image
                  width={150}
                  height={150}
                  src={`https://notes-hub.fly.dev/api/files/qzw10hvf1b4j777/${song.id}/${song.image}`}
                  alt={song.title}
                />
              </div>
            </div> */}
          </section>
          <section>
            <p>{song.verses}</p>
          </section>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>
          </section>
        </div>
      </div>
    </div>
  );
}
