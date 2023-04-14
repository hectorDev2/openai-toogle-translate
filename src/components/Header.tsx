import React from 'react'

  const logoStyle = {
    width: '50px',
    height: '50px',
    marginLeft: '10px'
  }


export const Header = () => {
  return (
    <div className='d-flex justify-content-center'>
      <h1 className='pr-2 pb-2 mr-10'>Toogle Translate</h1>
      <img style={logoStyle} src='/logo.svg'  />
    </div>
  )
}
