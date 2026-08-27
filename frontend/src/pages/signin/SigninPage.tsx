import { SignIn } from "@clerk/react"
import { redirectUrl } from "@/lib/constants"

function SigninPage() {
  return (
    <div className="flex justify-center">
      <SignIn path="/sign-in" routing="path" forceRedirectUrl={redirectUrl} />
    </div>
  )
}

export default SigninPage