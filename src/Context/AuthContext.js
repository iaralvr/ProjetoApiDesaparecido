import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
    const [logado, setLogado] = useState(false);
    const [error, setError] = useState(false);
    const [cadastro, setCadastro] = useState(false);
    const [usuarioId, setUsuarioId] = useState(0);

    async function Login(email, senha) {

        if (email != "" && senha != "") {
            await fetch('http://10.139.75.42:5251/api/Usuario/Login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    UsuarioEmail: email,
                    UsuarioSenha: senha
                })
            })
            .then(res => res.json())
            .then(json => {
                if( json.usuarioId ) {
                    setLogado( true );
                    setUsuarioId(json.usuarioId);
                } else {
                    setError( true );
                }
            }
            )
            .catch(err => setError( true ) )
        } else {
            setError(true)
        }
    }

    return (
        <AuthContext.Provider value={{ logado: logado, Login, error: error, cadastro: cadastro, usuarioId:usuarioId, setCadastro }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;