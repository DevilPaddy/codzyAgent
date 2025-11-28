import Image from "next/image"


export default function () {

    const leftTitle = "The Architecture of Thought";
    const leftDesc = "Bypass the syntax. Codzy translates your natural language into production-ready interfaces instantly. We bridge the gap between imagination and execution, allowing you to build bespoke web experiences simply by describing them.";
    const rightTitle = "Bespoke Design, Automized";
    const rightDesc = "Generic templates are a thing of the past. Codzy utilizes advanced generative logic to craft unique, responsive layouts tailored specifically to your prompt. Experience the intersection of high-end design principles and limitless AI capability.";

    return (
        <>
            <section className="desc-sec">
                <div className="desc-cover">
                    <div className="desc-left-cover">
                        <div className="image-cover">
                            <Image
                                src={'/descPic/appdev.png'}
                                alt="/descpic"
                                width={0}
                                height={0}
                                sizes="100vh"
                                className="desc-img"
                            />
                        </div>
                    </div>
                    <div className="desc-right-cover">
                        <div className="desc-title">
                            <h4>{leftTitle}</h4>
                        </div>
                        <div className="desc-para">
                            <p>{leftDesc}</p>
                        </div>
                    </div>
                </div>

                <div className="desc-cover">
                    <div className="desc-right-cover">
                        <div className="desc-title">
                            <h4>{rightTitle}</h4>
                        </div>
                        <div className="desc-para">
                            <p>{rightDesc}</p>
                        </div>
                    </div>
                    <div className="desc-left-cover">
                        <div className="image-cover">
                            <Image
                                src={'/descPic/dev.jpeg'}
                                alt="/descpic"
                                width={0}
                                height={0}
                                sizes="100vh"
                                className="desc-img"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}