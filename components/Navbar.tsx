import React from 'react'
import { Home, Contact  } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"


export default function Navbar() {
    const navItems = [
      { name: 'Home', url: '#home', icon: Home },
      // { name: 'About', url: '#', icon: User },
      // { name: 'Projects', url: '#', icon: Briefcase },
      { name: 'Contact Us', url: '#footer', icon: Contact }
    ]
  
    return <NavBar items={navItems}/>
  }