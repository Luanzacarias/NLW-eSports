import { useState, useEffect } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';

import { CreateAdBanner } from '../components/CreateAdBanner';
import { CreateAdModal } from '../components/CreateAdModal';
import { SliderGameBanner } from '../components/SliderGameBanner';
import { Loading } from '../components/Loading';

import { ArrowLeft, ArrowRight } from 'phosphor-react';
import logoImg from '../assets/logo-nlw-esports.svg';
import '../styles/main.css';



export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number;
  }
}

export function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // usando o axios porque torna menor e menos verbal que usando o fetch
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data);
      setLoading(false);
    })
  }, [])

  return (
    <div className="max-w-[1280px] mx-auto flex flex-col items-center my-20 px-6">
      <img 
        src={logoImg} 
        alt="Logo eSports" 
        className="w-44 sm:w-48 md:w-fit"
      />
      <h1 className="text-2xl xs:text-4xl sm:text-5xl md:text-6xl text-center text-white font-black mt-20">
        Seu <span className=" text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="flex flex-col w-full gap-2 mt-16 bg-zinc-800/40 p-4 rounded-lg ">
        
        {
          loading ? <Loading /> : (
            <>
              <div className="flex gap-2 items-center text-center text-zinc-400 justify-center xs:self-end sm:self-end">
                <ArrowLeft size={16}/>
                <p className="text-xs sm:text-sm">Arraste e descubra mais jogos</p>
                <ArrowRight size={16}/>
              </div>
              { 
                // assim o keen-slider não buga ao ser criado sem dados e dps surgir sem a dimensão correta
                games.length > 0 ? (<SliderGameBanner games={games}/>) : <></>
              }
            </>
          )
        }

      
      </div>
      
      
      <Dialog.Root
        open={open}
        onOpenChange={setOpen}
      >
        <CreateAdBanner />

        <CreateAdModal 
          handleClose={() => {setOpen(false)}}
        />
      </Dialog.Root>
      
    </div>
  )
}
