import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { motion } from 'framer-motion'
import { PushToTalkButton, BigTranscript, ErrorPanel } from "@speechly/react-ui"
import { useSpeechContext } from "@speechly/react-client"
import { useAtom } from "jotai"
import { name, position } from "../store/globalState"
import { CountCard, Variants } from '../components/CountCard'
import { UserCard } from '../components/UserCard'
import { Filters } from '../components/Filters'
import { NewUserForm } from '../components/NewUserForm'
import { users } from '../dataset'
import 'react-spring-bottom-sheet/dist/style.css'

export enum ActiveState {
  ALL = 'all',
  VACCINATED = 'vaccinated',
  UNVACCINATED = 'unvaccinated'
}

export interface UserData {
  id: string
  name: string
  position: string
  vaccinated: boolean
}


const Home: NextPage = () => {
  const [userName, setUserName] = useAtom(name)
  const [userPosition, setUserPosition] = useAtom(position)
  const { segment } = useSpeechContext()
  const [totalEmployee, setTotalEmployee] = useState<number>(0)
  const [vaccinated, setVaccinated] = useState<number>(0)
  const [unvaccinated, setUnVaccinated] = useState<number>(0)
  const [activeFilter, setActiveFilter] = useState<string>(ActiveState.ALL)
  const [allUsers, setAllUsers] = useState<UserData[] | []>(users)
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>(users)
  const [openBottomSheet, setOpenBottomSheet] = useState(false)

  const dismissBottomSheet = () => setOpenBottomSheet(false)

  useEffect(() => {
    const vaxxed = allUsers.filter(item => item.vaccinated === true).length
    const notVaxxed = allUsers.length - vaxxed

    setTotalEmployee(allUsers.length)
    setVaccinated(vaxxed)
    setUnVaccinated(notVaxxed)
  }, [allUsers])

  useEffect(() => {
    if (segment) {
      if(segment.intent.intent === "all") setActiveFilter(ActiveState.ALL)
      if(segment.intent.intent === "vaccinated") setActiveFilter(ActiveState.VACCINATED)
      if(segment.intent.intent === "unvaccinated") setActiveFilter(ActiveState.UNVACCINATED)
      if(segment.intent.intent === "newUser") setOpenBottomSheet(true)
      if(segment.intent.intent === "removeForm") dismissBottomSheet()
      if(segment.intent.intent === "name")  setUserName(segment.entities[0]?.value)
      if(segment.intent.intent === "position")  setUserPosition(segment.entities[0]?.value)
      if(segment.isFinal) {
        console.log(segment)
      }
    }
  }, [segment])

  return (
    <>
      <BigTranscript placement="top"/>
      <PushToTalkButton placement="bottom" captureKey=" "/>
      <ErrorPanel placement="bottom"/>

      <main className='flex justify-center'>
        <div className='w-full min-h-[100vh] lg:w-[35rem] p-4 bg-gray-100'>
          <section>
            <h2 className='text-gray-900 text-lg lg:text-2xl font-bold'>Employee vaccination report</h2>
            <div className='flex justify-between mt-4 px-6 py-4 bg-white rounded-md shadow-lg'>
              <CountCard value={totalEmployee} title="employee" style={Variants.EMPLOYEE} />
              <CountCard value={vaccinated} title="vaccinated" style={Variants.VACCINATED} />
              <CountCard value={unvaccinated} title="unvaccinated" style={Variants.UNVACCINATED} />
            </div>
          </section>

          <section className='mt-8'>
            <h2 className='text-gray-900 text-lg lg:text-2xl font-bold'>Employee list</h2>
            <Filters 
              allUsers={allUsers}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter} 
              setFilteredUsers={setFilteredUsers} 
            />
            <motion.div layout className='mt-6'>
              {filteredUsers.map((user) => <UserCard key={user.id} user={user} />)}
            </motion.div>
          </section>

          <button onClick={() => setOpenBottomSheet(true)} className='fixed bottom-4 right-4 z-10 h-10 w-10 bg-blue-900 text-white rounded-full'>+</button>
        </div>
      </main>
      <BottomSheet
        open={openBottomSheet}
        onDismiss={dismissBottomSheet}
      >
        <NewUserForm 
          allUsers={allUsers}
          setAllUsers={setAllUsers}
          setFilteredUsers={setFilteredUsers}
          dismissForm={dismissBottomSheet}
        />
      </BottomSheet>
    </>
  )
}

export default Home
