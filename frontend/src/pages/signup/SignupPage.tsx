import { SignUp } from "@clerk/react"

function SignupPage() {

    return (<div className="flex items-center mx-auto w-full justify-center">
        <SignUp path="/" forceRedirectUrl="/dashboard" />
    </div>
    )
};

export default SignupPage