import React from 'react'
import EyeCatcher from './EyeCatcher/index'
import About from './about_us/index'
import ProductInfo from './ProductInfo/index'

const StartPage = () => (
  <div className="startpage-wrapper">
    <EyeCatcher />
    <ProductInfo />
    <About />
  </div>
)

export default StartPage
