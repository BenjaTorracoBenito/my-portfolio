export function ColorPicker({ color, index, onChange }) {
    return (
        <div>
            <label htmlFor={`color${index}`}>Color {index + 1}:</label>
            <input
                type="color"
                id={`color${index}`}
                value={color}
                onChange={(e) => onChange(index, e.target.value)}
            />
        </div>
    );
}
