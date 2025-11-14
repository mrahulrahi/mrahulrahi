// app/(main)/layout.tsx
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Contact from '../components/Contact/Contact'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <div className="bg-gradient-2">
        <Contact />
        <Footer />
      </div>
    </>
  )
}
