// import { useRouter } from "next/router";
// import { useDispatch } from "react-redux";
// import PasswordResetForm from "../../components/PasswordResetForm";

// NB!
// 🧠 we dont need anything here, it's just a landing page
// 🧠 maybe i could even delete it (if i find a better landing place!)

export default function ResetPsw() {
    /*
    const router = useRouter();
    const dispatch = useDispatch();
    const { token } = router.query;

    const goHome = async () => {
        await router.push("/");
        router.reload();
        // resetErrorBoundary();
    };
    */
    // TODO: 🧠
    // quando arriviamo su questa pagina:
    // se token esiste ed é valido, open AuthModal nel form per reset psw
    // se token non esiste apri login - o messaggio token non valido
    // in ogni caso dobbiamo reinderizzare subito dopo a "/"
    /*
    if (token) {
        // come passo token a AuthModal ? 🧠🧠🧠
        // store token somewhere, like cookie
        dispatch(storeEmailToken(token));
        goHome();
    } else {
        return (
            <div>
                <p>Token not valid.</p>
                <button onClick={goHome} className="button-standard">
                    Return to the Home Page
                </button>
            </div>
        );
    }
*/
    /*
    return (
        <div>
            <h1>Reset Password</h1>
            {token ? <PasswordResetForm token={token} /> : <p>Invalid token</p>}
        </div>
    );
    */
}
