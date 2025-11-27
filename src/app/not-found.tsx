import Image from "next/image"
import Link from "next/link"

export default function () {

    return (
        <>
            <div className="h-screen">
                <div className="cover">
                    <div className="left-img">
                        <Image
                            src={'/404.svg'}
                            alt="404 pic"
                            width={0}
                            height={0}
                            sizes="100vh"
                            className="pic-error"
                        />
                    </div>
                    <div className="right-txt">
                        <p className="text-black md:text-[3em] text-center text-[1.4em] p-2 font-bold leading-tight">😕Sorry, the page you were looking for was not found.</p>
                        <p className="text-black md:text-[3em] text-center text-[1.4em] p-2 font-bold leading-tight">It's <span className="text-red-600 underline">404</span> ERROR</p>
                    </div>
                </div>
                <div className="w-screen mt-[-10em] md:mt-[-6em] text-center">
                    <Link
                        href={'/'}
                        className="text-blue-700 text-lg underline"
                    >Back to home
                    </Link>
                </div>
            </div>
        </>
    )
}