import { Link } from "react-router-dom";

export function NotFound(){
    return(
        <div className="flex flex-col w-full h-screen items-center justify-center p-4 gap-2">
            <h1 className="font-black text-white text-2xl xs:text-4xl sm:text-5xl">
                404
            </h1>
            <p className="text-zinc-200 text-center text-sm xs:text-base sm:text-lg">
                Infelizmente não achamos sua rota de destino
            </p>
            <p className="text-zinc-400 text-center text-xs xs:text-sm sm:text-base">
                <Link 
                    to="/"
                    className="underline italic"
                >
                    Clique aqui
                </Link> e volte para a página de início
            </p>
            
        </div>
    )
}