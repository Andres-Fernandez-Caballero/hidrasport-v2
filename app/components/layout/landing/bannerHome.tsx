import ImageLink from "@components/common/imageLink";
import { LinkImage } from "@interfaces/ILink";


  interface BannerHomeProps {
    items: LinkImage[];
  }
  
  const BannerHome = (props: BannerHomeProps) => {
    return (
      <menu className="grid gap-1 grid-rows-1 grid-cols-4 m-5 h-fit">
        {props.items.map((item) => (
          <ImageLink key={item.label} image={item.image} label={item.label} url={item.url} />
        ))}
      </menu>
    );
  };

  export default BannerHome;
  