import { SignIn } from "@clerk/react"

const redirectUrl = import.meta.env.VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL || "/dashboard"

function SigninPage() {

  return (
    <div className="flex justify-center">
      <SignIn path="/sign-in" routing="path" forceRedirectUrl={redirectUrl} />
    </div>
  )
}

export default SigninPage