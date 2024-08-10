export function TextInput({ userText, onChange }) {
    return (
        <div className='mt-4 flex gap-4 items-center'>
            <label htmlFor="userText">Texto para visualizar:</label>
            <input
                className='p-1 rounded-md outline-1 outline-blue-500'
                type="text"
                id="userText"
                value={userText}
                onChange={onChange}
                placeholder="Introduce tu texto aquí"
            />
        </div>
    );
}
