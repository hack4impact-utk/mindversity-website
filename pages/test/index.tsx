import {NextPage} from "next";
const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res =await fetch("/api/Contentful/upload", {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    console.log(data);
};

const Test: NextPage = () => {
    return(
        <div>
            <h1>Select a file</h1>
            <form onSubmit={handleSubmit}> 
                <input type="file" name="file"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Test;
