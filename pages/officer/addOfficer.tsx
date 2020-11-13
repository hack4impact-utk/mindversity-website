import { NextPage } from "next";
import { addOfficer } from "requests/Officer";
import { Officer } from "utils/types"

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    var officer: Officer = await addOfficer(formData);
};

const Test: NextPage = () => {
    return(
        <div>
            <h1>Add Officer</h1>
            <form onSubmit={handleSubmit} className="form">
                <label>Officer Name</label>
                <input type="text" name="name" placeholder="Officer Name" defaultValue="Kemal Fidan" required/>
                <textarea name="role" placeholder="Vice-President" defaultValue="El Presidente" required/>
                <textarea name="chapter" placeholder="University_of_Tennessee" defaultValue="University_of_Tennessee" required/>
                <textarea name="bio" placeholder="Enter bio here" defaultValue="This is my bio" required/>

                <label>Officer Picture</label>
                <input type="file" name="picture" required/> {/* TODO limit to 20MB */}
                <button type="submit">Submit</button>
            </form>
            <style jsx>{`
                .form{
                    display:flex;
                    flex-direction:column;
                }
                input, textarea, button, select {
                    margin: 20px;
                }
               
                `}</style>
        </div>
    );
};
export default Test;