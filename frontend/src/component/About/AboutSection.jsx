import React from 'react'
import aboutImg from "../../assets/images/about.png"
import aboutImgCart from "../../assets/images/about-card.png"
import { Link } from 'react-router-dom'

const AboutSection = () => {
  return <section>
    <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">

        {/* about img  */}
        <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1 ">
        <img src={aboutImg} alt="" />
        <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
            <img src={aboutImgCart} alt="" />
        </div>
        </div>
        

        {/* about content */}
        <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
        <h2 className="heading">
            Proud to be one of the nations best
        </h2>
        <p className="text-para">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam odio odio,
         accumsan vel venenatis vel, ullamcorper cursus est. Proin interdum turpis
          sapien, quis interdum elit ultricies a. Maecenas quis lacus sem. Sed 
         
        </p>
        <p className="text-para mt-[30px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam odio odio,
         accumsan vel venenatis vel, ullamcorper cursus est. Proin interdum turpis
          sapien, quis interdum elit ultricies a. Maecenas quis lacus sem. Sed 
         
        </p>
        <Link to={"/"} className="btn inline-block">Learn More</Link>
        </div>
        </div>
    </div>
  </section>

  

}

export default AboutSection
