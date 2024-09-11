import Header from '@/components/shared/Header'
import React from 'react'

import { transformationTypes } from '@/constants'
import TransformationFrom from '@/components/shared/TransformationFrom'


function AddTransformationPage({ params: {type}}: SearchParamProps) {

  const transformation = transformationTypes[type]

  return (
    <>
    <Header
      title={transformation.title}
      subtitle={transformation.subTitle}  />
    <TransformationFrom />
    </>
  )
}

export default AddTransformationPage