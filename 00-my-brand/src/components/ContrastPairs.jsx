export function ContrastPair({ combo, userText, onSwitchToggle }) {
  return (
    <section>
      <div
        className="w-full min-h-32 rounded-xl p-6"
        style={{
          backgroundColor: combo.isSwitched ? combo.color2 : combo.color1,
          color: combo.isSwitched ? combo.color1 : combo.color2,
        }}
      >
        <p className="w-full overflow-hidden break-words">{userText}</p>
      </div>
      <p className="text-center">{combo.ratio}</p>
      <div className="flex justify-center">
        <label htmlFor={`switch${combo.color1}${combo.color2}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        </label>
        <input
          className="m-1"
          type="checkbox"
          id={`switch${combo.color1}${combo.color2}`}
          checked={combo.isSwitched}
          onChange={onSwitchToggle}
        />
      </div>
    </section>
  );
}
