import React,{useEffecr,useState} from 'react';
import axios from 'axios';

function App(){
  const [students,setStudents] = useState([]);
  const [form, setForm] useState({
    name: '',
    age: '',
    course: ''
  })
  
  //GET API
  useEffect(() => {
    axios.get('http://localhost:5000/students')
      .then(res => setStudents(res.data));
  }, []);

  //Handle Input
  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //POST API
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/students', {form,
      age : Number(form.age)
    })
            .then(res=>{
              setStudents([...students, res.data]);
              setForm({name: '', age: '', course: ''});
            });
        };        

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Management App</h2>

      <form onSubmit={handleSubmit}>
 <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
 <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
 <input name="course" placeholder="Course" value{form.course} onChange={handleChange} />
 <button type="submit">Add Student</button>
</form>

<h3>Student List</h3>
<ul>
  {students.map(s, i) => (
    <li key={i}>
      {s.name} - {s.age} - {s.course}
    </li>
      ))}
      </ul>
  </div>
  );
}

export default App;
