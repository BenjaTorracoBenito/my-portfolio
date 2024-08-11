export function TextInput({ userText, onChange }) {
    return (
        <div className='omnes-light italic text-lg mt-4 flex gap-4 items-center'>
            <input
                className='omnes-light italic p-2 rounded-md outline-1 border-2 border-blue-500 outline-purple-500'
                type="text"
                id="userText"
                value={userText}
                onChange={onChange}
                placeholder="Introduce tu texto aquí"
            />
        </div>
    );
}
