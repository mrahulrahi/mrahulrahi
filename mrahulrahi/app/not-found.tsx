'use client'
import Link from "next/link"
import ContentContainer from "./components/ContentContainer"
import MouseFollower from './components/MouseFollower';

export default function NotFound({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
      <>
        <ContentContainer className=" page_404 bg-dark" column="col-sm-12">
          <div className="text-center">
            <div className="page_404-bg"></div>
 
            <div className="page_404-content">
              <h3>
                Look like you're lost
              </h3>

              <p>the page you are looking for not avaible!</p>

              <Link href="/" className="btn btn-gradient">Go to Home</Link>
            </div>
          </div>
        </ContentContainer>

        <MouseFollower />
      </>
  )
}