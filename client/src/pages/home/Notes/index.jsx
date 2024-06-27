import { NavBarNotes } from '../../../components'
import { useSelector } from 'react-redux'
import { useGetData } from '../../../hooks'

export default function index() {
  const {space} = useGetData(); 
  const objectId = useSelector((state) => state.createSpace.ObjectId);

 const spaceText = space.map(({_id, name}) => {
   if(_id === objectId) return name;
 })

  return (
    <>
    <NavBarNotes
    spaceText={spaceText}
    />
    </>           
  )
}
