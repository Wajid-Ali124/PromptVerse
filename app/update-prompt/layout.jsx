import {Suspense} from 'react'

const updatePrmptLayout = ({children}) => {
  return (
    <div>
        <Suspense>
            {children}
        </Suspense>
    </div>
  )
}

export default updatePrmptLayout