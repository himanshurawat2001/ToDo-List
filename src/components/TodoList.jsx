import { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FcTodoList } from "react-icons/fc";
import { BiEditAlt } from "react-icons/bi";

const getLocalStorageData = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const ToDoList = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(getLocalStorageData());
  const [updateToggle, setUpdateToggle] = useState(true);
  const [isUpdated, setIsUpdated] = useState(null);
  const addInput = () => {
    if (!input) {
      alert("Input Field Empty!!");
    } else if (input && !updateToggle) {
      setOutput(
        output.map((currElement) => {
          if (currElement.id === isUpdated) {
            return { ...currElement, name: input };
          }
          return currElement;
        })
      );
      setInput("");
      setUpdateToggle(true);
      setIsUpdated(null);
    } else {
      const allInputs = { id: new Date().getTime().toString(), name: input };
      setOutput([...output, allInputs]);
      setInput("");
    }
  };
  const deleteItem = (id) => {
    setOutput(
      output.filter((currElement) => {
        return currElement.id != id;
      })
    );
  };
  const editItem = (id) => {
    setInput(
      output.find((currElement) => {
        return currElement.id === id;
      }).name
    );
    setUpdateToggle(false);
    setIsUpdated(id);
  };
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(output), [output]);
  });
  return (
    <>
      <div className="border-[20px] border-blue-800 overflow-scroll py-3 w-[100%] h-screen flex flex-col justify-start items-center ">
        <div className="w-3/4 md:w-1/2 flex flex-col gap-4 mt-6 pt-8">
          <div className="flex flex-col justify-center items-center">
            <FcTodoList className="text-[5rem]" />
            <h1 className="pt-2 text-3xl font-bold tracking-wider rounded-lg text-center text-blue-900 ">
              ToDo-List
            </h1>
          </div>
          <div className="flex border-b-2 border-blue-600 justify-center w-full bg-blue-300 h-14 rounded-md  ">
            <input
              className="border-b-2 placeholder:text-gray-800 placeholder:italic bg-blue-300 border-blue-600 pl-2 mb-4 border-0 focus:outline-none rounded-md text-lg w-full h-14"
              type="text"
              value={input}
              placeholder="Add Items..."
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
            {updateToggle ? (
              <GrAdd
                onClick={addInput}
                className="rounded-lg text-black hover:bg-white relative top-3 mx-3 text-3xl cursor-pointer "
              />
            ) : (
              <BiEditAlt
                onClick={addInput}
                className="rounded-lg text-black hover:bg-white relative top-3 mx-3 text-3xl cursor-pointer "
              />
            )}
          </div>

          {output.map((currElement) => {
            return (
              <>
                <div className="flex flex-col gap-2">
                  <h3
                    className="bg-blue-300 hover:bg-blue-500 break-all text-xl min-h-12 h-auto flex items-center justify-between px-2 rounded-lg w-full"
                    key={currElement.id}
                  >
                    {currElement.name}
                    <div className="flex mx-1 gap-2">
                      <BiEditAlt
                        onClick={() => {
                          editItem(currElement.id);
                        }}
                        className=" text-3xl text-black hover:bg-white rounded-md"
                      />
                      <MdDelete
                        className=" text-3xl text-black hover:bg-white rounded-md"
                        onClick={() => {
                          deleteItem(currElement.id);
                        }}
                      />
                    </div>
                  </h3>
                </div>
              </>
            );
          })}
          <div className="flex justify-center items-center">
            <button
              className="w-1/2 md:1/4 h-10 hover:bg-blue-800 hover:text-white text-2xl rounded-lg text-center bg-blue-500"
              onClick={() => {
                setOutput([]);
              }}
            >
              Remove All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
