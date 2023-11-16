import { Card } from 'flowbite-react'
import React from 'react'

const FieldCard = () => {
  return (
    <Card
      className="w-[30%]"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzcmOGXiLykKC1-VoLGv7GYDa-r_jJ3C0tF_ECJgts&s"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Sân 1
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        S1-01
      </p>
    </Card>
  )
}

export default FieldCard