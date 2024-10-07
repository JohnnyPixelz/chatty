import SignIn from '@/components/sign-in';

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <SignIn redirectUrl="/profile" />
            {/* <EmailPasswordCard /> */}
        </div>
    );
};
