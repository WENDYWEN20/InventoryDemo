import React, { useState } from 'react'
import SignUpProvider from './component/SignUpContext' 
import Page1 from './component/Page1'
import Page2 from './component/Page2'

export default function Exercise() {
    const [page,setPage]=useState(1)
    const handleNext=()=>{setPage(2)} 
    const handlePrev=()=>{setPage(1)}
    return (
      <SignUpProvider>
      {page===1?(<Page1 onNext={handleNext}/>):(<Page2 onPrev={handlePrev}/>)}
      </SignUpProvider>
    )
  }
  