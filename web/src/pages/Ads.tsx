import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { AdBanner } from '../components/AdBanner';
import { Loading } from '../components/Loading';
import { CaretLeft } from 'phosphor-react';
import logoImg from '../assets/logo-nlw-esports.svg';


interface GameProps {
  title: string;
  bannerUrl: string;
}

export interface AdBannerProps {
    id: string;
    hourEnd: string;
    hourStart: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;
  }

export function Ads() {

    const [game, setGame] = useState<GameProps>()
    const [ads, setAds] = useState<AdBannerProps[]>([]);
    const [loadingGameInfo, setLoadingGameInfo] = useState(true);
    const [loadingAds, setLoadingAds] = useState(true);

    const { gameId } = useParams();

    useEffect(() => {
        // pegar os dados do Game 
        axios(`http://localhost:3333/games/${gameId}`).then(response => {
            setGame(response.data);
            setLoadingGameInfo(false);
        })

        // pegar os anúncios
        axios(`http://localhost:3333/games/${gameId}/ads`).then(response => {
            setAds(response.data);
            setLoadingAds(false);
        })
    },[])

    return(
        <div className="max-w-[1280px] mx-auto flex flex-col my-10 px-6 sm:px-12">
            
            <div className="flex items-center justify-between mb-3">
                <Link to=".." className="flex items-center gap-2 text-zinc-200 hover:text-zinc-400">
                    <CaretLeft size={32} />
                    <h1 className="text-base xs:text-lg sm:text-lg">Home</h1>
                </Link>
                <Link to="/">
                    <img src={logoImg} alt="logo" className="w-[70px] xs:w-[90px] sm:w-[120px]" />    
                </Link>
                <div className="w-[70px] bg-transparent hidden xs:hidden sm:block " />
            </div>
            
            <div className='flex gap-4 sm:gap-8 self-start'>
                
            {
                loadingGameInfo ? <Loading /> : (
                    <>
                        <img 
                            src={game?.bannerUrl} 
                            alt="" 
                            className='rounded-lg w-24 xs:w-36 sm:w-48 md:w-60'
                        />
                        <div className="flex flex-col self-end">
                            <h1 className='font-bold text-white text-base xs:text-lg sm:text-2xl md:text-3xl'>{game?.title}</h1>
                            <p className='text-zinc-400 text-xs xs:text-base sm:text-lg '>Conect-se e comece a jogar!</p> 
                        </div>
                    </>
                )
            }
                
                
                
            </div>
            
            <div className="justify-center mt-16 p-4 rounded-lg">  
            {
                loadingAds ? <Loading /> : (
                    <>
                        {   
                            ads.length > 0 ?
                            
                                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-6  ">
                                    { ads.map(ad => {
                                        return (
                                            
                                            <AdBanner 
                                                key={ad.id}
                                                id={ad.id}
                                                name={ad.name}
                                                weekDays={ad.weekDays}
                                                hourStart={ad.hourStart}
                                                hourEnd={ad.hourEnd}
                                                yearsPlaying={ad.yearsPlaying}
                                                useVoiceChannel={ad.useVoiceChannel}
                                            />
                                        
                                        )
                                    })  
                                }
                                </div> : (
                                    <div className="flex justify-center ">
                                        <p className="bg-zinc-800/40 text-white text-xs xs:text-sm sm:text-base text-center p-4 rounded-lg">
                                            Ainda não há anúncios, <Link to={'../'} className="text-zinc-400 underline hover:text-zinc-500" >clique aqui</Link> e crie um!
                                        </p>
                                    </div>
                                    
                                )
                                    
                        }
                    </>
                )
            }
                
            </div>
                
        </div>
    )
}