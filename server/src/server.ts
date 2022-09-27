// forma nova para usar esse tipo de importação, atraves do type:module no package.json
import express from 'express';
import cors from 'cors';
;
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minute';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();

// proteger backend
// o correto é que ele esteja especificado para o seu domínio
/*
    app.use(cors({
        origin: "http://rocketseat.com"
    }))
*/
app.use(cors())

// para o express entender quando receber um json
app.use(express.json());

const prisma = new PrismaClient(); // faz a conexão com o abnco de daos automaticamente.

// Listagem de games com contagem de anúncios
app.get('/games', async (request, response) => {

    const games = await prisma.game.findMany({
        // adicionar +1 na contagem de quantos anúncios
        include: {
            _count: {
                select: {
                    Ads: true,
                }
            }
        }
    });

    return response.json((games))
})

// Pegar somente os dados do game indicado
app.get('/games/:gameId', async (request, response) => {
    const gameId = request.params.gameId;
    const game = await prisma.game.findUnique({
        where: { 
            id: gameId
        }
    }); 
    
    return response.json((game))
})

// Criação de um novo anúncio
app.post('/games/:id/ads', async (request, response) => {
    // capturar o gameId da url
    const gameId = request.params.id;
    // pegar o corpo do anúncio enviado
    const body = request.body;

    // criar o envio para a criação do anúncio no prisma
    const ad = await prisma.ad.create({
        data: {
            gameId: gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','), // recebendo array transformando em string
            // recebendo em string-horas transformando em int-minutos na função
            hourStart: convertHourStringToMinutes(body.hourStart), 
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })
    

    return response.status(201).json(ad)
})

// Pegar os anúncios por game
// concatenação de recursos, identificar que é um parâmetro usa ":"
app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId: gameId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    // retornar com a formatação correta
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }))
})

// Buscar discord pelo ID do anúncio
// concatenação de recursos, identificar que é um parâmetro usa ":"
app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;
    // acha o id do ad único ou dispara um erro
    const ad = await prisma.ad.findUniqueOrThrow({
        select : {
            discord: true
        },
        where: {
            id: adId,
        }
    })

    return response.json({
        discord: ad.discord
    })
})


// rodando em ambiente de desenvolvimento
// especificar onde a aplicação está rodando
// localhost:3333
app.listen(3333);