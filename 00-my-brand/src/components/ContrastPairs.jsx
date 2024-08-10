export function ContrastPair({ combo, userText, onSwitchToggle }) {
    return (
        <div className='mt-4'>
            <div
                className="min-h-20 p-3"
                style={{
                    backgroundColor: combo.isSwitched ? combo.color2 : combo.color1,
                    color: combo.isSwitched ? combo.color1 : combo.color2,
                }}
            >
                {userText}
            </div>
            <p className='text-center'>{combo.ratio}</p>
            <div className='flex justify-center'>
                <label htmlFor={`switch${combo.color1}${combo.color2}`}>
                        Switch
                    </label>
                    <input
                        className='m-1'
                        type="checkbox"
                        id={`switch${combo.color1}${combo.color2}`}
                        checked={combo.isSwitched}
                        onChange={onSwitchToggle}
                    />
            </div>
        </div>
    );
}

