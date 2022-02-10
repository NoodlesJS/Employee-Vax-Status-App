import { UserAddIcon, UserGroupIcon, UserRemoveIcon } from '@heroicons/react/outline'

export enum Variants {
  EMPLOYEE = 'employee',
  VACCINATED = 'vaccinated',
  UNVACCINATED = 'unvaccinated'
}

const variantStyle = {
  employee: {
    bg: 'bg-orange-100',
    icon: <UserGroupIcon className="h-8 w-8 text-orange-600" />
  },
  vaccinated: {
    bg: 'bg-green-100',
    icon: <UserAddIcon className="h-8 w-8 text-green-600" />
  },
  unvaccinated : {
    bg: 'bg-gray-100',
    icon: <UserRemoveIcon className="h-8 w-8 text-gray-600" />
  }
}

interface CountCardProps {
  value: number
  title: string
  style: Variants
}

export const CountCard = ({value, title, style} : CountCardProps) => {
  return (
    <div className='flex flex-col items-center w-[30%]'>
      <div className={`flex justify-center items-center h-16 w-16 rounded-full ${variantStyle[style]?.bg}`}>
        {variantStyle[style]?.icon}
      </div>
      <p className='mt-3 text-gray-900 text-lg font-bold'>{value}</p>
      <p className='text-gray-600 text-sm'>{title}</p>
    </div>
  )
}
