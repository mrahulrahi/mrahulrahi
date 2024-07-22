'use client'

import ContentContainer from "./components/ContentContainer"

export default function NotFound({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <ContentContainer className="page_404" column="col-sm-12">
          <div className="text-center">
            <div className="four_zero_four_bg">



            </div>

            <div className="contant_box_404">
              <h3 className="h2">
                Look like you're lost
              </h3>

              <p>the page you are looking for not avaible!</p>

              <a href="" className="link_404">Go to Home</a>
            </div>
          </div>
        </ContentContainer>
      </body>
    </html>
  )
}