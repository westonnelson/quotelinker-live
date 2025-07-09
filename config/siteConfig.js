// Site Configuration - QuoteLinker
// This will be converted to TypeScript when migrating to Next.js

export const siteConfig = {
  company: {
    name: "QuoteLinker",
    tagline: "Connecting customers with trusted insurance pros through innovative technology and personalized service.",
    email: "support@quotelinker.com",
    phone: "(763) 292-3692",
    city: "Minneapolis, MN",
    address: {
      mailing: "QuoteLinker LLC\n400 S 4th St Ste 410 PMB 629080\nMinneapolis, MN 55415-1419",
      legal: "18388 60th Avenue North, Plymouth, MN 55446, USA"
    },
    disclaimer: "QuoteLinker is a digital lead generation platform. We are not an insurance agency, broker or carrier. Insurance products are offered through a network of licensed agents."
  },
  
  businessHours: {
    weekdays: "Monday – Friday  8:00 AM – 8:00 PM CST",
    weekends: "Closed Saturday & Sunday"
  },
  
  products: [
    { name: "Auto Insurance", href: "/auto-insurance.html" },
    { name: "Home Insurance", href: "/home-insurance.html" },
    { name: "Life Insurance", href: "/life-insurance.html" },
    { name: "Health Insurance", href: "/health-insurance.html" },
    { name: "Business Insurance", href: "/business-insurance.html" }
  ],
  
  companyLinks: [
    { name: "About Us", href: "/about.html" },
    { name: "For Customers", href: "/customers.html" },
    { name: "For Agents", href: "/agents.html" },
    { name: "Contact", href: "/contact.html" },
    { name: "Privacy Policy", href: "/privacy.html" },
    { name: "Terms of Service", href: "/terms.html" }
  ],
  
  social: [
    {
      name: "YouTube",
      href: "https://www.youtube.com/@QuoteLinker",
      icon: "youtube"
    },
    {
      name: "LinkedIn", 
      href: "https://www.linkedin.com/company/quotelinker",
      icon: "linkedin"
    }
  ]
};
