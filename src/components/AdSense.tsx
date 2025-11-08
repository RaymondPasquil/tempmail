import React from 'react'
import Script from 'next/script' // ✅ import Script

type AdSenseProps = {
  pId: string
}

// ✅ Use React.FC<AdSenseProps> so it returns JSX correctly
const AdSense: React.FC<AdSenseProps> = ({ pId }) => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}

export default AdSense
