import InfoCard from "@components/common/cards/infoCard"
import { InfoCardData } from "@interfaces/hidraApi/landingPage";


interface InfoCardProps {
    items: InfoCardData[]
}

const InfoCardsHome = (props: InfoCardProps) => (
    <div className="grid space-x-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-10">
      {props.items.map((item, index) => (
          <InfoCard
            imageWidth={400}
            imageHeight={400}
            key={index}
            {...item}
          />
      ))}
         </div>
)

export default InfoCardsHome;