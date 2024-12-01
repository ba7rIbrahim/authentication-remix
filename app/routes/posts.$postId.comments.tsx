import { ChangeEvent, useState } from "react";

function Comments() {
  const [input, setInput] = useState<string>("");
  const [inputState, setInputState] = useState<string[]>([]);

  // const [search, setSearch] = useState<string>('');
  const array: string[] = ["test", "hello", "Love❤️", "symbols⚡"];
  const [based, setArrayBased] = useState<string[]>(array);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event?.target.value.toLowerCase();
    const filterItem = array.filter((item) => {
      return item.toLowerCase().includes(searchValue);
    });
    setArrayBased(filterItem);
  };

  console.log(based);

  return (
    <div className="w-1/2">
      {/* <div className="flex gap-3 items-center">
        <input
          value={input}
          type="text"
          placeholder="enter someone"
          className="border p-2 rounded-lg my-4 flex-1"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-teal-500 text-white p-2 rounded-lg w-fit"
          onClick={() => {
            setInputState([...inputState, input]);
            setInput("");
          }}
        >
          Add Commit
        </button>
      </div> */}
      <div>
        <input
          type="text"
          placeholder="enter someone"
          className="border p-2 rounded-lg my-4 flex-1 w-full"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <div className="flex-col gap-3">
          {based?.map((v, id) => {
            return (
              <p key={id} className="bg-gray-50 py-1 px-2 rounded-lg">
                {v}
              </p>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {inputState.map((s, id) => {
          return (
            <p className="bg-gray-100 py-1 px-2 rounded-lg" key={id}>
              {s}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
