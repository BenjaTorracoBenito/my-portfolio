export function ColorPicker({ color, index, onChange }) {
    return (
        <section className="grid grid-cols-3">
            <input
                className="place-self-start h-full col-span-2 p-2 text-center max-w-fit border-2 border-blue-500 rounded-md outline-1 outline-purple-500" 
                type="text"
                size={8}
                id={`hexcolor${index}`}
                maxLength={7}
                value={color}
                onChange={(e) => onChange(index, e.target.value)}
            />
            <input
                className="place-self-end input h-full aspect-square shadow-none outline-none bg-transparent border-none"
                type="color"
                id={`color${index}`}
                value={color}
                onChange={(e) => onChange(index, e.target.value)}
            />
        </section>
    );
}
