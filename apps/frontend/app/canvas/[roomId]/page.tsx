
import RoomCanvas from "@/app/components/roomCanvas";

export default async function Canvas({params}:{
  params:{
    roomId:string
  }
}) {
  const roomId =( await params).roomId
  console.log(roomId);
  return(
    <div>
      <RoomCanvas roomId={roomId}/>
      
    </div>
  )
  
}
