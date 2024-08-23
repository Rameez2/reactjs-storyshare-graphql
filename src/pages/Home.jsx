import HeroSection from "../components/HeroSection";
import HomeIntro from "../components/HomeIntro";
// import FeaturedStories from "../components/stories/FeaturedStories";
import StoriesList from "../components/stories/StoriesList";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HomeIntro/>
      {/* <FeaturedStories/> */}
      <StoriesList />
    </div>
  )
}
