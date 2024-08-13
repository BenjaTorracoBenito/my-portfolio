export function TextInput({ userText, onChange }) {
    return (
        <input
                className='w-full md:col-span-2 italic p-2 rounded-md outline-1 border-2 border-blue-500 outline-purple-500'
                type="text"
                id="userText"
                value={userText}
                onChange={onChange}
                placeholder="Introduce tu texto aquí"
        />
    );
}
