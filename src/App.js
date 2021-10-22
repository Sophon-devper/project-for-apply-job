import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Register } from './components/register'
import { Profile } from './components/profile';
import { Course } from './components/course'
import { Create } from './components/create'
import { Login } from './components/login'

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/course" component={Course}/>
          <Route exact path="/create" component={Create} />
        </Switch>
      </div >
    </Router>
  );
}

export default App
