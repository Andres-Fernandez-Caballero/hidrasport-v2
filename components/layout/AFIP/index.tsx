import { AFIP_DATA_WEB, AFIP_QR } from "@config/index";
import Image from "next/image";
import Link from "next/link";

const AFIP = () => {
  return (
    <section className="col-span-4">
      <Link href={AFIP_QR} target="_F960AFIPInfo">
        <Image src={AFIP_DATA_WEB} alt="afip-qr" width={60} height={80} />
      </Link>
    </section>
  );
};
export default AFIP;
