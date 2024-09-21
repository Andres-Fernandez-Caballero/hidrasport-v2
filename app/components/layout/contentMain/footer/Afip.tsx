import {} from "@config/index";
import Image from "next/image";
import Link from "next/link";
import { AFIP_QR, AFIP_QR_IMAGE } from "@config/index";
const AFIP = () => (
  <section className="col-span-4">
    <Link href={AFIP_QR} target="_F960AFIPInfo">
      <Image src={AFIP_QR_IMAGE} alt="afip-qr" width={60} height={80} priority/>
    </Link>
  </section>
);
export default AFIP;
