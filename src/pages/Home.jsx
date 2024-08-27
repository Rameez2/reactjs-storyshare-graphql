import HeroSection from "../components/HeroSection";
import HomeIntro from "../components/HomeIntro";
// import FollowedAuthorsStory from "../components/stories/FollowedAuthorsStory";
import StoriesList from "../components/stories/StoriesList";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HomeIntro/>
      <StoriesList />
      {/* Followed Authors stories */}
      {/* <FollowedAuthorsStory/> */}
    </div>
  )
}