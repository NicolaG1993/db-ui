export default function PasswordRecoveryForm({ handleTab }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const handleStep = (n) => setStep(n);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: ... 🚧🔴🔴🔴
    };

    if (step === 1) {
        // Enter email
        return (
            <div>
                <p>Reset Password: step {step}/3</p>
            </div>
        );
    } else if (step === 2) {
        // Enter code ?
        return (
            <div>
                <p>Reset Password: step {step}/3</p>
            </div>
        );
    } else if (step === 3) {
        // TODO: This should be separate from this process: PasswordResetForm 🔴🔴🔴
        // Reset password
        return (
            <div>
                <p>Reset Password: step {step}/3</p>
            </div>
        );
    }
}
