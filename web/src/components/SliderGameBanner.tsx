import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { Game } from "../pages/Home";
import { GameBanner } from "./GameBanner";

interface Props {
    games: Game[];
}

export function SliderGameBanner({ games }: Props) {

    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "free-snap",
        slides: {
            perView: () => {
                // pega o tamanho da tela e coloca uma quantidade adequada de GameBanner
                if(window.innerWidth <= 360){
                    return 1
                }else if(window.innerWidth > 360 && window.innerWidth <= 465){
                    return 2
                } else if(window.innerWidth > 465 && window.innerWidth <= 640){
                    return 3
                } else if(window.innerWidth > 640 && window.innerWidth <= 768){
                    return 4
                } else if (window.innerWidth > 768 && window.innerWidth <= 900){
                    return 5
                } else if (window.innerWidth > 900 && window.innerWidth <= 1024){
                    return 6
                } else {
                    return 7
                }
            },
            spacing: 15,
        },
        renderMode: 'performance',

    })

    return(
        <div ref={sliderRef} className="keen-slider py-2 hover:cursor-grab active:cursor-grabbing ">
            
            {
                games.map(game => {
                    return (
                        <div key={game.id} className="keen-slider__slide flex items-center justify-center max-h-60">
                            <GameBanner 
                                key={game.id}
                                id={game.id}
                                bannerUrl={game.bannerUrl} 
                                title={game.title}
                                adsCount={game._count.Ads} 
                            />
                        </div>
                    )
                })
            }
        </div>
    )

}