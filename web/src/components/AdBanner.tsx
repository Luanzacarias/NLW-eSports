import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

import { AdInfo } from "./AdInfo";
import { AdBannerProps } from '../pages/Ads';
import { GameController } from "phosphor-react";
import { DiscordModal } from "./DiscordModal";



export function AdBanner(data: AdBannerProps){

    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col px-6 py-4 bg-[#2A2634] w-full max-w-[200px] xs:max-w-[250px] sm:max-w-[250px] rounded-xl ">
            <AdInfo
                label="Nome"
                value={data.name}
            />
            <AdInfo
                label="Tempo de jogo"
                value={`${data.yearsPlaying} ano(s)`}
            />
            <AdInfo
                label="Disponibilidade"
                value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
            />
            <AdInfo
                label="Chamada de áudio?"
                value={data.useVoiceChannel ? 'Sim' : 'Não'}
                colorValue={data.useVoiceChannel ? 'text-emerald-400' : 'text-red-500'}
            />
            <Dialog.Root
                open={open}
                onOpenChange={setOpen}
            >
                <Dialog.Trigger className="px-4 sm:px-8 md:px-4 py-3 self-center bg-violet-500 text-white rounded-md hover:bg-violet-600 flex items-center gap-2 sm:gap-3 w-fit">
                    <GameController size={24} />
                    Conectar
                </Dialog.Trigger>
                <DiscordModal adId={data.id} handleClose={() => {setOpen(false)}} />
            </Dialog.Root>
        </div>
    )
}