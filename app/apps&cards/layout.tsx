import React from 'react'
import './style.css'
import Banner from './Banner' 

export default function ACLayout({

  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
    <Banner />
    <main>{children}</main>
    </div>
  )
}
