import React from 'react'
import { useState, useContext, createContext } from 'react'

const PhotosContext = createContext(null)

const usePages = () => {
  const context = useContext(PhotosContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  return context
}

const PhotosProvider = (props) => {
  const [page, setPage] = useState(1)
  // возможно, стоило бы мемоизировать наш стейт, на page, setPage, но решил не разделять,
  // т.к. в логике данного приложения мы везде, где используем как setPage, так и page.
  // Но, при необходимости использования лишь номера страницы, желательно мемоизировать

  return <PhotosContext.Provider value={[page, setPage]} {...props} /> 
}

export {PhotosProvider, usePages}