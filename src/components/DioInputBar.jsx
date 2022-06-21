export default function DioInputBar({
  dioLabel,
  dioValue,
  dioOnChange,
  dioIndex,
  dioName,
  dioType,
  dioClassName,
}) {
  return (
    <div className="flex flex-col m-2 p-2">
      <label htmlFor={dioLabel}>{dioLabel}</label>
      <input
        onChange={(event) => {
          dioOnChange(event, dioIndex);
        }}
        value={dioValue}
        name={dioName}
        className={dioClassName}
        id={dioLabel}
        type={dioType}
      />
    </div>
  );
}
