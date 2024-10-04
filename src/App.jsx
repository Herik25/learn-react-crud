import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [showForm, setForm] = useState(false);
  const [data, setData] = useState([]);
  const [showEditForm, setEditForm] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/posts");
      setData(res.data);
    } catch (error) {
      console.log("error in fetching data : ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const hanldeEditData = async (id) => {
    setCurrentId(id);
    setEditForm(true);
    if (id) {
      console.log("asdfa");
      try {
        const res = await axios.get(`http://localhost:5000/posts/${id}`);
        reset({
          name: res.data.name,
          desc: res.data.description,
        });
      } catch (error) {
        console.log("error in fetching data : ", error);
      }
    }
  };

  const hanldleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/posts/${id}`);
      console.log(res.data);
    } catch (error) {
      console.log("error in deleting data : ", error);
    }
  };

  return (
    <div className=" flex flex-col gap-5">
      <div className=" flex items-center justify-center py-2 border-b-[1px] border-black">
        <button
          onClick={() => setForm(!showForm)}
          className=" px-4 py-2 bg-slate-600 rounded-md text-white font-bold border border-black hover:bg-slate-400"
        >
          Add
        </button>
      </div>
      {showForm && (
        <div className=" flex items-center justify-center h-[80vh]">
          <div className=" flex flex-col items-center max-w-sm w-full bg-[#f5f5f5] rounded-md shadow-md p-6">
            <h1 className=" text-xl font-bold mb-5">Add</h1>
            <form
              onSubmit={handleSubmit((data) => {
                try {
                  const res = axios.post("http://localhost:5000/posts", {
                    name: data.name,
                    description: data.desc,
                  });
                  if (res) {
                    console.log("data sent");
                    setForm(!showForm);
                  }
                } catch (error) {
                  console.log("error in posting data : ", error);
                }
              })}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 focus:ring-slate-500 focus:border-slate-500 block w-full rounded-md border-gray-300 px-4 py-2"
                  {...register("name")}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="desc"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  className="mt-1 focus:ring-slate-500 focus:border-slate-500 block w-full rounded-md border-gray-300 px-4 py-2"
                  {...register("desc")}
                />
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="w-full flex justify-center py-2 bg-slate-600 rounded-md text-white font-bold border border-black hover:bg-slate-4"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      )}
      {showEditForm && (
        <div className=" flex items-center justify-center h-[80vh]">
          <div className=" flex flex-col items-center max-w-sm w-full bg-[#f5f5f5] rounded-md shadow-md p-6">
            <h1 className=" text-xl font-bold mb-5">EDIT</h1>
            <form
              onSubmit={handleSubmit((data) => {
                try {
                  const res = axios.put(
                    `http://localhost:5000/posts/${currentId}`,
                    {
                      name: data.name,
                      description: data.desc,
                    }
                  );
                  if (res) {
                    console.log("data sent");
                    setForm(!showForm);
                  }
                } catch (error) {
                  console.log("error in posting data : ", error);
                }
              })}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 focus:ring-slate-500 focus:border-slate-500 block w-full rounded-md border-gray-300 px-4 py-2"
                  {...register("name")}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="desc"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  className="mt-1 focus:ring-slate-500 focus:border-slate-500 block w-full rounded-md border-gray-300 px-4 py-2"
                  {...register("desc")}
                />
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="w-full flex justify-center py-2 bg-slate-600 rounded-md text-white font-bold border border-black hover:bg-slate-4"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      )}
      {!showForm && (
        <div className=" flex flex-nowrap gap-10">
          {data.map((el) => {
            return (
              <div
                key={el.id}
                className="flex flex-col gap-1 p-2 border-[1px] border-black max-w-[200px]"
              >
                <h2 className="text-xl font-bold"> name : {el.name}</h2>
                <p> desc : {el.description}</p>
                <button
                  onClick={() => {
                    hanldeEditData(el.id);
                  }}
                  className=" w-full bg-slate-500 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    hanldleDelete(el.id);
                  }}
                  className=" w-full bg-rose-500 text-white"
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
