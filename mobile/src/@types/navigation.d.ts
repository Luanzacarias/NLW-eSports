
export interface GameParams {
    id: string;
    title: string;
    bannerUrl: string;
}

// ipando a nossa rota, o que vai ajudar a receber os elementos necessários em Game
export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            game: GameParams;
        }
    }
}