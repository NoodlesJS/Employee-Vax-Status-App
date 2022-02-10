import { SetStateAction, useEffect } from "react"
import { UserData, ActiveState } from "../pages"

interface FiltersProp {
  allUsers : UserData[]
  activeFilter : string
  setActiveFilter : React.Dispatch<SetStateAction<string>>
  setFilteredUsers : React.Dispatch<SetStateAction<UserData[]>>
}

export const Filters = ({allUsers, activeFilter, setActiveFilter, setFilteredUsers} : FiltersProp) => {

  useEffect(() => {
    if(activeFilter === ActiveState.VACCINATED) {
      const filtered = allUsers.filter(user => user.vaccinated === true)
      setFilteredUsers(filtered)
      return
    }
    if(activeFilter === ActiveState.UNVACCINATED) {
      const filtered = allUsers.filter(user => user.vaccinated === false)
      setFilteredUsers(filtered)
      return
    }
    setFilteredUsers(allUsers)
  }, [activeFilter])

  return (
    <div className="my-2">
      <button onClick={() => setActiveFilter('all')} className={`px-3 py-1 rounded-full text-xs ${activeFilter === ActiveState.ALL ? 'text-white bg-blue-900' : 'text-blue-900 border border-blue-900'}`}>All</button>
      <button onClick={() => setActiveFilter('vaccinated')} className={`ml-2 px-3 py-1 rounded-full text-xs ${activeFilter === ActiveState.VACCINATED ? 'text-white bg-blue-900' : 'text-blue-900 border border-blue-900'}`}>Vaccinated</button>
      <button onClick={() => setActiveFilter('unvaccinated')} className={`ml-2 px-3 py-1 rounded-full text-xs ${activeFilter === ActiveState.UNVACCINATED ? 'text-white bg-blue-900' : 'text-blue-900 border border-blue-900'}`}>Unvaccinated</button>
    </div>
  )
}
