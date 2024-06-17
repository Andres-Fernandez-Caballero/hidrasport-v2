import ImageLink from "@components/imageLink";
import { LinkImage } from "@interfaces/ILink";


  interface BannerHomeProps {
    items: LinkImage[];
  }
  
  const BannerHome = (props: BannerHomeProps) => {
    return (
      <menu className="grid gap-1 grid-rows-1 grid-cols-4 m-5 h-fit">
        {props.items.map((item) => (
          <ImageLink key={item.text} image={item.image} text={item.text} url={item.url} />
        ))}
      </menu>
    );
  };

  export default BannerHome;
  