import { useEffect, useState, FormEvent } from "react";
import axios from 'axios';
import * as Dialog from "@radix-ui/react-dialog";
import * as CheckBox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Select from '@radix-ui/react-select';

import { Check, GameController, CaretDown, CaretUp } from "phosphor-react";

import { Input } from "./Form/Input";
import { Loading } from "./Loading";


// colocando só o que vai usar
interface Game {
    id: string;
    title: string;
}

interface Props {
  handleClose: () => void;
}

export function CreateAdModal({ handleClose }: Props) {

    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [gameId, setGameId] = useState('');
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

    const [creatingAd, setCreatingAd] = useState(false);

    useEffect(() => {
        // usando o axios porque torna menor e menos verbal que usando o fetch
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data);
        })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement) // afirmando q o target vai ser um form
        const data = Object.fromEntries(formData)
        
        // Validação simples
        if(gameId.length === 0) {
          alert('Campo vazio')
          return;
        }
        if (!data.name || 
            !data.yearsPlaying || 
            !data.discord || 
            !data.hourStart || 
            !data.hourEnd ||
            weekDays.length < 1) {
          alert('Campo vazio')
          return;
        }

        try {
            setCreatingAd(true);
            // data.game porque game é o nome do campo onde ele digitou
            await axios.post(`http://localhost:3333/games/${gameId}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                // para transformar tudo em Number e sort pra deixar em ordem crescente
                weekDays: weekDays.map(Number).sort(), 
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            setCreatingAd(false);
            handleClose();
            alert('Anúncio criado com sucesso')
            setGameId('');
            setUseVoiceChannel(false);
            setWeekDays([]);
            
        } catch (err) {
            console.log(err);
            alert('Erro ao criar o anúncio')
        }
    }

    return (
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 inset-0 fixed" />

          <Dialog.Content className="fixed flex flex-col max-h-[90vh] bg-[#2A2634] py-4 px-3 xs:px-5 sm:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-4/5 max-w-[480px] shadow-lg shadow-black/25 ">
            <Dialog.Title className="text-lg xs:text-2xl sm:text-3xl text-center font-black">Publique um anúncio</Dialog.Title>

            <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4 p-2 overflow-auto">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                
                <Select.Root
                  onValueChange={setGameId}
                >

                  <Select.Trigger
                    className="flex justify-between text-xs sm:text-sm bg-zinc-900 py-3 px-4 rounded "
                  >
                    <Select.Value 
                      placeholder="Selecione o game que deseja jogar"
                    />
                    <Select.Icon >
                      <CaretDown size={20} />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content 
                      className="bg-zinc-700 rounded-md text-white"
                    >

                      <Select.ScrollUpButton
                        className="flex items-center justify-center"
                      >
                        <CaretUp size={20} className="text-white" />
                      </Select.ScrollUpButton>

                      <Select.Viewport 
                        className="flex flex-col gap-1"
                      >

                      { 
                        games.map(game => {
                          return (
                            <Select.Item 
                              key={game.id} value={game.id}
                              className="flex items-center relative px-6 py-1 rounded-md hover:bg-zinc-900 hover:cursor-pointer"  
                            >
                              <Select.ItemText>{game.title}</Select.ItemText>
                              <Select.ItemIndicator
                                className="absolute left-0 w-6 inline-flex justify-center items-center"
                              >
                                <Check weight="bold" className="w-4 h-4 text-emerald-400" />
                              </Select.ItemIndicator>
                            </Select.Item>
                            )
                        })
                      }

                      </Select.Viewport>

                      <Select.ScrollDownButton
                        className="flex items-center justify-center"
                      >
                        <CaretDown size={20} className="text-white" />
                      </Select.ScrollDownButton>

                    </Select.Content>
                  </Select.Portal>

                </Select.Root>
                
              </div>

              <div className="flex flex-col gap-2 text-xs sm:text-base">
                <label htmlFor="name">Seu nome/nickname</label>
                <Input name="name" id="name" type="text" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 text-xs sm:text-base">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col gap-2 text-xs sm:text-base">
                  <label htmlFor="discord">Qual o seu Discord?</label>
                  <Input name="discord" id="discord" type="text" placeholder="Usuário#000" />
                </div>
              </div>

              <div className="flex flex-col xs:flex-row sm:flex-row  gap-6">
                <div className="flex flex-col gap-2 text-xs sm:text-base">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                
                
                    <ToggleGroup.Root 
                        type="multiple" 
                        className="grid grid-cols-4 gap-2"
                        value={weekDays}
                        onValueChange={setWeekDays}
                    >

                        <ToggleGroup.Item 
                            value="0"
                            title="Domingo"
                            className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}  
                        >
                        D
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                            value="1"
                            title="Segunda"
                            className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                        S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                            value="2"
                            title="Terça"
                            className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                        T  
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                            value="3"
                            title="Quarta"
                            className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                        Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                            value="4"
                            title="Quinta"
                            className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                        Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                            value="5"
                            title="Sexta"
                            className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                        S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item 
                            value="6"
                            title="Sábado"
                            className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        >
                            S
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>

                <div className="flex flex-col gap-2 text-xs sm:text-base flex-1">
                  <label htmlFor="hourStart">Qual o horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      name="hourStart" 
                      id="hourStart" 
                      type="time" 
                      placeholder="De" 
                      className="bg-zinc-900 py-3 px-4 rounded text-xs sm:text-sm text-center" 
                    />
                    <input 
                      name="hourEnd" 
                      id="hourEnd" 
                      type="time" 
                      placeholder="Até" 
                      className="bg-zinc-900 py-3 px-4 rounded text-xs sm:text-sm text-center" 
                    />
                  </div>
                </div>
              </div>

              <label className="mt-2 flex gap-2 text-xs sm:text-sm items-center cursor-pointer">
                <CheckBox.Root 
                    className="w-6 h-6 p-1 rounded bg-zinc-900 block"
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                        if(checked === true) {
                            setUseVoiceChannel(true);
                        } else {
                            setUseVoiceChannel(false);
                        }
                    }}  
                >
                    <CheckBox.CheckboxIndicator>
                        <Check className="w-4 h-4 text-emerald-400"/>
                    </CheckBox.CheckboxIndicator>
                </CheckBox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className="mt-4 flex flex-col-reverse xs:flex-row sm:flex-row justify-end items-end gap-4 ">
                <Dialog.Close 
                  type="button"
                  className="bg-zinc-500 px-5 h-12 w-fit rounded-md text-xs sm:text-sm font-semibold hover:bg-zinc-600"
                >
                  Cancelar
                </Dialog.Close>
                <button 
                  type="submit"
                  className="bg-violet-500 px-5 h-12 w-fit rounded-md text-xs sm:text-sm font-semibold flex items-center gap-3 hover:bg-violet-600 disabled:cursor-not-allowed disabled:grayscale-50 "
                  disabled={creatingAd}
                >
                  {
                    creatingAd ? <Loading /> : (
                      <>
                        <GameController size={24}/>
                        Encontrar duo
                      </>
                    )
                  }
                  
                </button>
              </footer>

            </form>
          </Dialog.Content>
        </Dialog.Portal>
    )
}