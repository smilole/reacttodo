import './App.css'
import {Button, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";


function Header() {
    return (
        <header className="site-header">
            <h2>TO-DO List</h2>
        </header>
    )
}



function App() {

    const dispatch = useDispatch()
    const tasks = useSelector(state => state)

    console.log(tasks)

    function createTask(newTask){
        dispatch({type: "CREATE_TASK", taskInfo: newTask})
    }

    function downloadAsFile(data) {
        let a = document.createElement("a");
        let file = new Blob([data], {type: 'application/json'});
        a.href = URL.createObjectURL(file);
        a.download = "example.json";
        a.click();
    }

    function readFile(input) {

        let file = input.target.files[0];

        let reader = new FileReader();

        reader.readAsText(file);



        reader.onload = function() {
            dispatch({type:"FILE_UPLOAD", payload:JSON.parse(reader.result)})
        };

        reader.onerror = function() {
            console.log(reader.error);
        };

    }




    return (
        <>
            <Header/>
            <Card>
                <Card.Header className={"flex"}>
                    <Button onClick={() => createTask(prompt("Describe a task:"))}>Create task</Button>
                    <div>
                        <input type="file" onChange={readFile}/>
                        <Button onClick={() => downloadAsFile(JSON.stringify(tasks))}>Save JSON</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    {tasks.map(task =>
                        // eslint-disable-next-line react/jsx-key
                        <Card key={task.ID}>
                            <Card.Body>
                                {task.description}
                            </Card.Body>
                            <Card.Footer>
                                <Button onClick={() => dispatch({type:"DELETE_TASK", ID:task.ID})}>
                                    Delete
                                </Button>
                                <Button onClick={() => dispatch({type:"UPDATE_TASK", ID:task.ID, description:prompt("Write a new description:")})}>
                                    Update
                                </Button>
                                <Button variant={task.isDone?"success":"danger"} onClick={() => dispatch({type:"UPDATE_STATUS", ID:task.ID})}>
                                    {!task.isDone?"Not Ready":"Ready"}
                                </Button>
                            </Card.Footer>
                        </Card>
                    )}
                </Card.Body>
            </Card>
        </>
    )
}

export default App
