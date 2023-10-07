import { AFIP_DATA_WEB, AFIP_QR } from "@config/index"
import Image from "next/image"
import Link from "next/link"

const AFIP = () => {
    return (
        <section className='col-span-4'>
            <a href={AFIP_QR} target="_F960AFIPInfo">
           <img src={AFIP_DATA_WEB} style={{border: '0' }} width={60} height={80} />
            </a>
		</section>
    )
}
export default AFIP