import { useState } from "react";

function Form() {
  const onFileUrlEntered = (e) => {
    // hold UI
    setProcessing(true);
    setAnalysis(null);

    computerVision(fileSelected || null).then((item) => {
      // reset state/form
      setAnalysis(item);
      setFileSelected("");
      setProcessing(false);
    });
  };
  const [data, setData] = useState({
    url: "",
  });
  const handleChange = ({ target: { name, value } }) =>
    setData({ ...data, [name]: value });
  const creatTask = async (data) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (router.query.id) {
        if (typeof router.query.id === "string")
          await updateTask(router.query.id, task);
      } else {
        await creatTask(data);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="url"
          class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
          type="text"
          placeholder="https://example.com"
          value={data.url}
          onChange={handleChange}
        />
        <button
          type="submit"
          class="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Form;
