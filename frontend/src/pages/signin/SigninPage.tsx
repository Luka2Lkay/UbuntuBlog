import { SignIn } from "@clerk/react"

// import { useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "@clerk/react"

function SigninPage() {

    //   const navigate = useNavigate();

    // const { signOut, isSignedIn, isLoaded } = useAuth();

    // useEffect(() => {

    //     if (isLoaded && isSignedIn) {
    //         signOut();
    //     }
    //     navigate("/sign-in");
    // }, [])

  return (
    <div className="flex justify-center">
      <SignIn path="/sign-in" routing="path" forceRedirectUrl="/dashboard" />
    </div>
  )
}

export default SigninPage