import { Link } from 'react-router-dom';

interface GameBannerProps {
  id: string;
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props : GameBannerProps){
    return (
        <Link to={`games/${props.id}/ads`} className='relative rounded-lg overflow-hidden w-40'>
          <img src={props.bannerUrl} alt="" />

          <div className="w-full p-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">{props.title}</strong>
            <span className="text-zinc-300 text-sm block ">{props.adsCount} aúncio(s)</span>
          </div>
        </Link>
    )
}