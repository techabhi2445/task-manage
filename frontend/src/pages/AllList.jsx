import React from 'react'
import '../../src/App.css'

const AllList = () => {
  const [data,setData] = React.useState([]);
  React.useEffect(()=>{
    fetch('https://task-manage-1-uawb.onrender.com/api/alltasks')
    .then(res=>res.json())  
    .then(result=>{
      setData(result.tasks);
    })
  },[])



  



  return (
   <>
   
   <main className="container">
    <h1 className="page-title">AllList</h1>
    {
      data.length === 0 ? (
        <p className="no-tasks">No tasks available.</p>
      ) : (
        <p className="task-count">{data.length} Tasks Found</p>
      )}
      <section className="task-list">
        {data.map((task) => (
          <article key={task.id} className="task">
            <div className="task-body">
              <h2 className="task-title">{task.title}</h2>
              <p className="task-desc">{task.description}</p> 
            </div>
            <div className="task-actions">
<button
              className="btn btn-update"
              type="button"
              onClick={() => handleUpdate(task.id)}
            >
              Update
            </button>
            <button
              className="btn btn-delete"
              type="button"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
            </div>
          </article>
        ))}
      </section>  
    

   
  </main>
    
   </>
  )
}

export default AllList
