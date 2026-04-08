


type Props={
    params:{
        id:string
    }
}

export default async function userProfile({params}:Props){
    const {id}=await params
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p className="text-4xl">Profile page </p>
            <span className="bg-orange-300 p-2 rounded-2xl m-2 text-3xl text-black">
                {id}
            </span>
        </div>
    )
}