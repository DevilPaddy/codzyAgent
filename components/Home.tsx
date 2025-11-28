import Link from "next/link"


export default function () {
    return (
        <>
            <section className="home px-4">
                <div className="hero-cover">
                    <div className="hero-title">
                        <h4 className="hero-title-txt ">“Where Intelligence Meets <span className="hero-title-txt-span">Design</span>”</h4>
                    </div>

                    <div className="hero-para">
                        <p className="hero-para-txt">
                            Create stunning websites effortlessly with our AI agent, built for the visionaries of tomorrow
                        </p>
                    </div>

                    <div className="btn-sec">
                        <div className="left-btn">
                            <Link
                                href={'/signup'}
                                className="btn signup-btn"
                            >SignUp
                            </Link>
                        </div>
                        <div className="right-btn">
                            <Link
                                href={'/login'}
                                className="btn login-btn"
                            >Login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
           
        </>
    )
}