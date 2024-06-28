import { InfoCardData } from "@interfaces/hidraApi/landingPage";
import Image from "next/image";




interface InfoCardProps extends InfoCardData {
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
}

const InfoCard = (props: InfoCardProps) => (
    <div className="rounded-xl shadow-xl bg-gray-100">
        <div className=" p-5 flex flex-col ">
            <div className="rounded-xl overflow-hidden">
                <Image
                    src={props.image}
                    alt={props.imageAlt?? props.title}
                    width={props.imageWidth ?? 400}
                    height={props.imageHeight ?? 400}
                    className="rounded-sm max-h-48"
                />
            </div>
            <h3 className="text-2xl font-medium mt-3 text-center">{props.title}</h3>
            <p className="text-slate-500 text-lg mt-3 text-center">{props.text}</p>
        </div>
    </div>
);

export default InfoCard;