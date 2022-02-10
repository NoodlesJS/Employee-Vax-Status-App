import { motion } from 'framer-motion'

interface UserCardProps {
  user : {
    name: string
    position: string
    vaccinated: boolean
  }
}

export const UserCard = ({user} : UserCardProps) => {
  const firstLetter = user.name.charAt(0)
  // const colorChoices = ['bg-red-700', 'bg-blue-900', 'bg-orange-700', 'bg-purple-700', 'bg-green-800', 'bg-pink-800']
  // const randomColor = colorChoices[Math.floor(Math.random() * colorChoices.length)]

  return (
    <motion.div layout className="flex items-center mt-2 px-4 py-2 bg-white rounded-md shadow-lg">
      <div className={`flex justify-center items-center h-16 w-16 rounded-full bg-blue-900`}>
        <p className="text-white font-3xl">{firstLetter}</p>
      </div>
      <div className="ml-4">
        <p className="text-gray-900 text-base font-bold">{user.name}</p>
        <p className="text-gray-700 text-sm mb-2">{user.position}</p>
        <p className={`inline-flex text-xs px-2 py-1 rounded-full ${user.vaccinated? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{user.vaccinated? 'Vaccinated' : 'Unvaccinated'}</p>
      </div>
    </motion.div>
  )
}
