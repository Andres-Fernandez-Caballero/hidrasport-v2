import { LinkImage } from "@interfaces/ILink";
import Image from "next/image";
import Link from "next/link";


const ImageLink = (props: LinkImage) => (
    <Link
          href={props.url}
          className="relative opacity-90 h-fit m-2 "
          style={{ position: 'relative' }}
        >
          <Image
            src={props.image}
            alt={props.text}
            width={400}
            height={400}
            className=" blur-sm "
          />
          <h2 className="font-sans font-bold text-4xl text-blue-50 tracking-wide absolute inset-0 flex items-center justify-center p-4 bg-transparent bg-opacity-0 hover:bg-opacity-25 hover:scale-110 ease-in-out duration-300">
            {props.text}
          </h2>
        </Link>
)

export default ImageLink;