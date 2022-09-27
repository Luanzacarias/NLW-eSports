
interface Props {
    label: string;
    value: string;
    colorValue?: string;
}

export function AdInfo({label, value, colorValue}: Props) {
    return (
        <div className="flex flex-col mb-4 text-white">
            <h1 className="text-zinc-400 text-xs xs:text-sm sm:text-base">
                { label }
            </h1>
            <p className={`text-bold text-sm xs:text-base sm:text-base ${colorValue} `}>
                { value }
            </p>

        </div>
    )
}