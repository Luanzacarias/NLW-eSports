import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner(){
    return (
        <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
            <div className="bg-[#2A2634] px-8 py-6 flex flex-col gap-4 items-center md:flex-row md:justify-between md:gap-0">
            
                <div>
                    <strong className="text-xl sm:text-2xl text-white font-black block text-center md:text-left">Não encontrou seu duo?</strong>
                    <span className="text-sm sm:text-base text-zinc-400 block text-center md:text-left">Publique um anúncio para encontrar novos players!</span>
                </div>
                <Dialog.Trigger className="px-4 sm:px-8 md:px-4 py-3 self-center bg-violet-500 text-white rounded-md hover:bg-violet-600 flex items-center gap-2 sm:gap-3 w-fit">
                    <MagnifyingGlassPlus size={24} />
                    Publicar anúncio
                </Dialog.Trigger>

            </div>
        </div>
    )
}