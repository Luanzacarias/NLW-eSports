import { CircleNotch } from "phosphor-react";

export function Loading() {
    return (
        <div className="w-full flex items-center justify-center animate-spin">
            <CircleNotch size={24} className="text-[#43E7AD]" />
        </div>
    )
}