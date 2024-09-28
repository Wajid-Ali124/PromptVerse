import {Suspense} from 'react'

const UserLayout = ({children}) => {
  return (
    <div>
        <Suspense>
            {children}
        </Suspense>
    </div>
  )
}

export default UserLayout