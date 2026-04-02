import './App.css';
import Container from '@mui/material/Container';
import Header from './components/Header';
import { useContext } from 'react';
import { ModeProvider } from './components/Context/ContextFile';
import Search from './components/Search';
import Temperature from './components/Temperature';
import { Toaster } from 'react-hot-toast';
function App() {

  const { mode } = useContext(ModeProvider);
  return (
    <>
    <div className={`app ${mode}`}>
      <Header />
      <Container maxWidth="lg" className="item-center" style={{paddingTop:"30px",flexDirection:"column", gap:"30px"}}>
        {/* <Search /> */}
        <Search />
        {/* <Temperature /> */}
        <Temperature />
      </Container>
    </div>
    <Toaster
      position="bottom-center"
      reverseOrder={false} 
    />
    </>
  )
}

export default App
