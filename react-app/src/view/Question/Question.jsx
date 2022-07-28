import React from 'react';
import { useParams } from 'react-router-dom';

export default function Question() {

  // const [state,setState] = useState([
  //   {name:"question one", description: "Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the question Answer of the questionAnswer of the question Answer of the question"}
  // ]);

  const {id} = useParams();
console.log(id)
  return (
    <>
      <h1>Question {id}</h1>
    </>
  )
}
