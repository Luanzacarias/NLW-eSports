import { useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { CheckCircle, X } from "phosphor-react";
import { Loading } from "./Loading";


interface Props {
    adId: string;
    handleClose: () => void;
}

export function DiscordModal({ adId, handleClose }: Props) {
    
    const [discord, setDiscord] = useState('')
    const [loading, setLoading] = useState(true);

    function handleCopyToClipboard(){
        const copyText = document.getElementById('discord');
        
    }

    // Pegar Id discord do ad
    useEffect(() => {
        axios(`http://localhost:3333/ads/${adId}/discord`).then((response) => {
            setDiscord(response.data.discord);
            setLoading(false);
        })
    },[])

    return(
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 inset-0 fixed" />

            <Dialog.Content className="fixed flex flex-col bg-[#2A2634] py-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-4/5 max-w-[360px] shadow-lg shadow-black/25  ">
                <Dialog.Title className="flex flex-col items-center justify-center px-2 ">
                    <button 
                        className="self-end hover:opacity-80"
                        onClick={handleClose}
                    >
                        <X size={20} className="text-zinc-400"/>
                    </button>
                    
                    <CheckCircle className={`w-12 h-12 xs:w-16 xs:h-16 sm:w-16 sm:h-16 text-emerald-400`} weight="bold" />
                </Dialog.Title>
                <div className="py-2 px-3 xs:px-5 sm:px-10">
                    <div className="flex flex-col">
                        <h1 className="text-lg xs:text-2xl sm:text-2xl text-center text-white font-black">
                            Let's play!
                        </h1>
                        <p className="text-center text-zinc-400 text-xs xs:text-sm sm:text-base">
                            Agora é só começar a jogar!
                        </p>
                    </div>
                    <div className="flex flex-col mt-4 gap-2 justify-center items-center">
                        <h1 className="text-center text-white font-bold text-xs xs:text-sm sm:text-base">Adicione no Discord</h1>
                        {
                            loading ? (
                                    <div className="bg-zinc-900 py-2 px-4 rounded w-full max-w-[170px]">
                                        <Loading />  
                                    </div>
                                ) : (
                                <>
                                    <CopyToClipboard text={discord} >
                                        <a 
                                            href="https://discord.com/channels/@me"
                                            target="_blank"
                                            onClick={handleClose}
                                            className="text-center text-xs xs:text-sm sm:text-base text-zinc-200 bg-zinc-900 py-2 px-4 rounded w-full max-w-[170px] hover:opacity-80"
                                        >
                                            { discord }
                                        </a>
                                    </CopyToClipboard>
                                    <p className="text-center text-zinc-500 text-[10px] xs:text-xs sm:text-xs">
                                    Usuário será copiado e discord será aberto.
                                    </p>
                                </>
                            )
                        }
                        
                    </div>
                </div>

            </Dialog.Content>

        </Dialog.Portal>
    )
}