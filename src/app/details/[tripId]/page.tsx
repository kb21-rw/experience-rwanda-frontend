import Header from "@/components/Header";
import { HeaderVariant } from "@/enums/Header";
import TripPackage from "@/components/TripPackage";
import GalleryGrid from "@/components/GalleryGrid";
const TripDetailsPage = async () => {
  return (
    <div>
      <Header
        title="Description"
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
        }
        variant={HeaderVariant.SECONDARY}
      />
      <TripPackage title="Trip Packages" />
      <GalleryGrid title="Gallery" />
    </div>
  );
};

export default TripDetailsPage;
