import { SignUp } from "@clerk/react"

const redirectUrl = import.meta.env.VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL || "/dashboard"

function SignupPage() {

    return (<div className="flex items-center mx-auto w-full justify-center">
        <SignUp path="/" forceRedirectUrl={redirectUrl} />
    </div>
    )
};

export default SignupPage