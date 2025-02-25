import { SocialIcon } from "next-social-icons"
import Link from "next/link"

const Footer = () => {
    const navLinks =[
        "Home",
        "Booking",
        "About Us",
        "Contact"
    ]

    const icons = [
        "instagram",
        "twitter",
        "youtube"
    ]

  return (
    <footer className="flex justify-between p-10 bg-black text-white mb-0">
       <h3>ExperienceRw</h3>

       <div className="navigation flex gap-3">
          {
            navLinks.map((link)=> (<Link href={"#"} key={link}>{link}</Link>))
          }
       </div>

       <div className="social-icons flex gap-3">
          {
            icons.map((icon) => <SocialIcon className="text-white" key={icon} size={32} platform={icon} />)
          }
       </div>
    </footer>
  )
}

export default Footer