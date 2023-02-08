import React,{useState, useEffect} from 'react'
import axios from 'axios';

function FetchData() {

    const [profiles, setProfiles] = useState([]);
    const getProfiles = () =>{
        const config ={
            headers : {
            "Content-Type":"application / json",
            authorization: "Access-Control-Allow-Origin",
        }
    }
        try{
            axios.get("http://localhost:5000/post", config).then((res)=> {
            var profiles = res.data;
            // console.log(res.data)
            setProfiles(profiles);
        });
    }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getProfiles();
    },[]);
  return (
    <>
        <ul className="profile-list">
       {profiles.length > 0 ? 
       (profiles.map((profile)=>(
       <li key={profile.id}>
       <p> I'm {profile.name}</p>
       <p>Contant me - {profile.email}</p>
       <p>I am {profile.age} years old</p>
       <p>From {profile.city}</p>
       </li>
       ))
       ): (
       <h1>No Profiles Found</h1>
       )}
        </ul>
    </>
  );
}

export default FetchData;