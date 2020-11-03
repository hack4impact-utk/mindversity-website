import {NextPage} from "next";
const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res =await fetch("/api/Contentful/update", {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    console.log(data);
};

const Test: NextPage = () => {
    return(
        <div>
            <h1>Update Chapter</h1>
            <form onSubmit={handleSubmit} className="form"> 
                <label>Chapter Name</label>
                <input type="text" name="name" placeholder="Chapter Name" required/>
                <label>Region</label>
                <select name='region' required>
                    <option value="">Please select a region.</option>
                    <option value="nw">North West</option>
                    <option value="se">South East</option>
                    <option value="sw">South West</option>
                    <option value="ne">North East</option>
                </select>
                <label>Campus Image</label>
                <input type="file" name="campus"/>
                

                <textarea name="description" placeholder="Enter description here..." required/>
                <label>University Logo</label>
                <input type="file" name="logo"/>
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
