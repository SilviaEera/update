import FeaturedEvents from "../components/FeaturedEvents";
import FeaturedSongs from "../components/FeaturedSongs";

export default function HomePage() {
  return (
    <div className="bg-white">
      <FeaturedEvents />
      <FeaturedSongs />
    </div>
  );
}
