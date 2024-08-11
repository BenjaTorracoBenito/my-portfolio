export function ColorPicker({ color, index, onChange }) {
    return (
        <section className="flex justify-center gap-4">
            <input
                className="p-2 text-center max-w-fit border-2 border-blue-500 rounded-md outline-1 outline-purple-500" 
                type="text"
                size={7}
                id={`hexcolor${index}`}
                maxLength={7}
                value={color}
                onChange={(e) => onChange(index, e.target.value)}
            />
            <input
                className="input h-full aspect-square shadow-none outline-none bg-transparent border-none"
                type="color"
                id={`color${index}`}
                value={color}
                onChange={(e) => onChange(index, e.target.value)}
            />
        </section>
    );
}
