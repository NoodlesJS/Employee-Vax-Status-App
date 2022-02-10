import { SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { useAtom } from "jotai"
import { name, position } from "../store/globalState"
import { UserData } from "../pages"

interface NewUserFormProp {
  allUsers : UserData[]
  setAllUsers : React.Dispatch<SetStateAction<UserData[]>>
  setFilteredUsers : React.Dispatch<SetStateAction<UserData[]>>
  dismissForm: () => void
}

interface formData {
  name: string
  position: string
  vaccinated: string
}

export const NewUserForm = ({allUsers ,setAllUsers, dismissForm, setFilteredUsers} : NewUserFormProp) => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm<formData>()
  const [userName, setUserName] = useAtom(name)
  const [userPosition, setUserPosition] = useAtom(position)

  const onSubmit = ({name, position, vaccinated} : formData) => {
    reset()
    setUserName('')
    setUserPosition('')
    const newUserData = {
      id: `${Math.random()}`,
      name,
      position,
      vaccinated : vaccinated === "true" ? true : false
    }
    dismissForm()
    setAllUsers([newUserData ,...allUsers])
    setFilteredUsers([newUserData ,...allUsers])
  }

  return (
    <section className="px-4 pt-4 mb-28">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-gray-900 text-lg font-bold">Add new employee</h2>
        <label className='flex flex-col mt-4 text-sm text-gray-500'>
          Employee name
          <input value={userName} className='h-10 mt-1 px-2 text-gray-900 rounded bg-gray-100 border border-gray-300' placeholder='Enter employee name' type="text" id="name" {...register("name", {required: true})} />
          {errors.name && <span className="text-sm text-red-600">This field is required</span>}
        </label>
        <label className='flex flex-col mt-4 text-sm text-gray-500'>
          Position
          <input value={userPosition} className='h-10 mt-1 px-2 text-gray-900 rounded bg-gray-100 border border-gray-300' placeholder='Enter position' type="text" id="position" {...register("position", {required: true})} />
          {errors.position && <span className="text-sm text-red-600">This field is required</span>}
        </label>
        <label className="flex flex-col mt-4" htmlFor="vaccination">
          Vaccination status
          <select className="h-10 mt-1 px-2 text-gray-900 rounded" id="vaccinated" {...register("vaccinated", {required: true})}>
            <option className="bg-gray-100" value="">----</option>
            <option className="bg-gray-100" value="true">Vaccinated</option>
            <option className="bg-gray-100" value="false">Unvaccinated</option>
          </select>
          {errors.vaccinated && <span className="text-sm text-red-600">This field is required</span>}
        </label>
        <button className="w-full h-12 mt-4 bg-blue-900 text-white rounded-md">Submit</button>
      </form>
    </section>
  )
}
