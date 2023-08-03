import { createRoot } from 'react-dom/client';
import './css/index.css';
import { Main } from './Main';

function render() {
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(<Main />);
}

render();
