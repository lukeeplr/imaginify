import Header from '@/components/shared/Header'
import React from 'react'

import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'


async function AddTransformationPage ({ params: {type}}: SearchParamProps) {

  const { userId } = auth()

  if (!userId) {
    redirect('/entrar')
  }

  const user = await getUserById(userId)

  const transformation = transformationTypes[type]

  return (
    <>
    <Header
      title={transformation.title}
      subtitle={transformation.subTitle}  />
    <section className='mt-10'>
    <TransformationForm
      action='Add'
      userId={user._id}
      type={transformation.type as TransformationTypeKey}
      creditBalance={user.creditBalance}
      />
    </section>
    </>
  )
}

export default AddTransformationPage