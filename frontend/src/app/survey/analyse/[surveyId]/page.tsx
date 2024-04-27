import React from 'react'

function page({params}:{params:any}) {
  return (
    <div>
        Analysis of {params.surveyId}
    </div>
  )
}

export default page