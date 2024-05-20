import React from 'react'
import { NavBarNotes } from '../../../components'
import { useSelector } from 'react-redux'

export default function index() {
  const spaceText = useSelector(state => state.createSpace.spaceText)
  return (
    <>
    <NavBarNotes
    spaceText={spaceText}
    />
    </>
  )
}
